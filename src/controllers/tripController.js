import tripModel, { weathers } from "../models/trip.js";
import memberTripModel from "../models/member_has_trip.js";
import memberModel from "../models/member.js";
import routeModel from "../models/route.js";
import { Op } from "sequelize";


async function getInscriptions(req, res) {
    const member = req.session.member;
    const idMember = member?.idMember;
    let inscriptions = [];
    if (idMember) {
        inscriptions = await memberTripModel.findAll({
            where: { Member_idMember: idMember }
        });  
    } 
    return inscriptions;
}

async function getAll(req, res) {
    console.log("en getAll req.body: ", req.body);

    const hoy = new Date();

    //traer las rutas futuras
    let futureTrips = await tripModel.findAll({
        where: {
            Time: {
                [Op.gt]: hoy //Operator Greater than hoy
            }
        }
    });
    futureTrips = futureTrips.map(trip => { trip.past = false; return trip });

    //traer las rutas pasadas
    let pastTrips = await tripModel.findAll({
        where: {
            Time: {
                [Op.lte]: hoy //Operator Less Than or Equal than hoy
            }
        }
    });
    pastTrips = pastTrips.map(trip => { trip.past = true; return trip });

    // Traer las inscripciones del usuario actual
    const inscriptions = await getInscriptions(req, res);

    const signedTrips = inscriptions.map(i => i.Trip_idTrip);
    console.log("signedTrips: ", signedTrips);

    //traer el numero de asientos de coche que aporta el usuario en la salida
    const memberFreeSeats = {};
    inscriptions.forEach(i => {
        memberFreeSeats[i.Trip_idTrip] = i.freeSeats;
    });
    console.log("memberFreeSeats: ", memberFreeSeats);

    const guides = await memberModel.findAll();
    const routes = await routeModel.findAll();
    res.render("trip/list", { routes, guides, pastTrips, futureTrips, signedTrips, memberFreeSeats });
}

async function getByID(req, res) {
    console.log("en getByID req.body: ", req.body);
    const id = req.params.id;
    const trip = await tripModel.findByPk(id);
    const routes = await routeModel.findAll();
    const guides = await memberModel.findAll();
    res.render("trip/show", { trip, routes, guides });
}

async function signUp(req, res) {
    //cuando los valores se pasan por formulario con post se ponen en req.body
    //cuando se pasan por get con la forma ?id=1&name=pepe se ponen en req.query
    console.log("en signUp req.body: ", req.body); 
    const member = req.session.member;
    const idMember = member?.idMember;

    const { Trip_idTrip, Member_idMember, freeSeats } = req.body;
    console.log("Procesando: Trip_idTrip: "+Trip_idTrip+" idMember: "+ Member_idMember+" freeSeats: "+ freeSeats);
    console.log("idMember logeado: "+idMember);
    const entry = await memberTripModel.findOne({
        where: {
            Trip_idTrip: Trip_idTrip,
            Member_idMember: idMember
        }
    });
    console.log("entry encontrada: ", entry);
    if (entry) {
        console.log("miembro "+idMember+ "ya figura inscrito en la salida "+Trip_idTrip+", la actualizo con freeseats: ", freeSeats);

        await memberTripModel.update({
            freeSeats: freeSeats
        }, {
            where: {
                Trip_idTrip: Trip_idTrip,
                Member_idMember: idMember
            }
        });
    } else {
        console.log("miembro "+idMember+ "no figura inscrito en la salida "+Trip_idTrip+", lo inscribo con freeseats: ", freeSeats);
        await memberTripModel.create({
            Trip_idTrip: Trip_idTrip,
            Member_idMember: idMember,
            freeSeats: freeSeats
        });
    }
    res.redirect("/trip");
};

async function unsubscribe(req, res) {
    const member = req.session.member;
    const Member_idMember = member?.idMember;
    const { Trip_idTrip } = req.body;

    console.log("Eliminando: Trip_idTrip: "+Trip_idTrip+" idMember: "+ Member_idMember);
    await memberTripModel.destroy({
        where: {
            Trip_idTrip,
            Member_idMember
        }
    });

    res.redirect("/trip");
}

async function createForm(req, res) {
    console.log("en createForm req.params: ", req.params);
    const guides = await memberModel.findAll();
    const routes = await routeModel.findAll();
    res.render("trip/create", { guides, routes, weathers });
}

async function create(req, res) {
    console.log("en create req.body: ", req.body);
    const { Time, meetingPoint, idGuide, idRoute, weather } = req.body;
    try {
        const response = await tripModel.create({
            Time: Time,
            meetingPoint: meetingPoint,
            idGuide: idGuide,
            idRoute: idRoute,
            weather: weather
        });
    } catch (error) {
        console.error("Error al crear la salida:", error);
        res.status(500).send("Error al crear la salida");
    }
    res.redirect("/trip");
}
async function editForm(req, res) {
    console.log("en editForm req.params: ", req.params);
    const id = req.params.id;
    const trip = await tripModel.findByPk(id);
    if (!trip) {
        res.redirect("/trip")
    }
    const guides = await memberModel.findAll();
    const routes = await routeModel.findAll();
    console.log("trip a editar: ", trip);
    res.render("trip/edit", { trip, guides, routes, weathers });
}
async function edit(req, res) {
    console.log("en edit req.body: ", req.body);
    const id = req.params.id;
    const { Time, meetingPoint, idGuide, idRoute, weather } = req.body; // los datos para modificar el trip

    const trip = await tripModel.findByPk(id);
    trip.Time = Time;
    trip.meetingPoint = meetingPoint;
    trip.idGuide = idGuide; // el id del guide
    trip.idRoute = idRoute; // el id del route
    trip.weather = weather;
    try {
        await trip.save();
    } catch (error) {
        console.error("Error al editar la salida:", error);
        res.status(500).send("Error al editar la salida");
    }

    res.redirect("/trip/" + id);
}

async function remove(req, res) {
    console.log("en remove req.params: ", req.params);
    const id = req.params.id;

    const trip = await tripModel.findByPk(id);
    try {
        if (trip) {
            await trip.destroy();
        } else {
            console.log("No se pudo encontrar la salida");
            res.redirect("/trip");
        }
    } catch (error) {
        console.error("Error al eliminar la salida:", error);
        res.status(500).send("Error al eliminar la salida");
    }
    res.redirect("/trip");
}

export {
    getAll,
    getByID,
    createForm,
    signUp,
    unsubscribe,
    create,
    editForm,
    edit,
    remove,
}

export default {
    getAll,
    getByID,
    createForm,
    signUp,
    unsubscribe,
    create,
    editForm,
    edit,
    remove,
};