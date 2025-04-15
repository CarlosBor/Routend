import routeModel, { difficulties, terrains } from "../models/route.js";

async function getAll(req, res) {
    console.log("en getAll req.body: ", req.body);
    const routes = await routeModel.findAll();
    res.render("route/list", { routes });
}

async function getByID(req, res) {
    console.log("en getByID req.body: ", req.body);
    const id = req.params.id;
    const route = await routeModel.findByPk(id);
    res.render("route/show", { route }); 
}

async function createForm(req, res) {
    console.log("en createForm req.params: ", req.params);
    res.render("route/create", { difficulties, terrains });
}
async function create(req, res) {
    console.log("en create req.body: ", req.body);
    const { location, durationMins, distance, difficulty, elevationGain, terrainType } = req.body;
    try {
        const response = await routeModel.create({
            location: location,
            durationMins: parseInt(durationMins),
            distance: distance,
            difficulty: difficulty,
            elevationGain: elevationGain,
            terrainType: terrainType
        });
    } catch (error) {
        console.error("Error al crear la ruta:", error);
        res.status(500).send("Error al crear la ruta");
    }
    res.redirect("/route");
}
async function editForm(req, res) {
    console.log("en editForm req.params: ", req.params);
    const id = req.params.id;
    const route = await routeModel.findByPk(id);
    if (!route) {
        res.redirect("/route")
    }
    console.log("route a editar: ", route);
    res.render("route/edit", { route, difficulties, terrains });
}
async function edit(req, res) {
    console.log("en edit req.body: ", req.body);
    const id = req.params.id;
    const { location, durationMins, distance, difficulty, elevationGain, terrainType } = req.body; // los datos para modificar el route

    const route = await routeModel.findByPk(id);
    route.location = location;
    route.durationMins = parseInt(durationMins) || 0;
    route.elevationGain = elevationGain;
    route.distance = distance;
    route.difficulty = difficulty;
    route.terrainType = terrainType;
    try {
        await route.save();
    } catch (error) {
        console.error("Error al editar la ruta:", error);
        res.status(500).send("Error al editar la ruta");
    }
    
    res.redirect("/route/" + id);
}

async function remove(req, res) {
    console.log("en remove req.params: ", req.params);
    const id = req.params.id;

    const route = await routeModel.findByPk(id);
    try {
        if (route) {
            await route.destroy();
        } else {
            console.log("No se pudo encontrar la ruta");
            res.redirect("/route");
        }
    } catch (error) {
        console.error("Error al eliminar la ruta:", error);
        res.status(500).send("Error al eliminar la ruta");
    }
    res.redirect("/route");
}

export {
    getAll,
    getByID,
    createForm,
    create,
    edit,
    remove,
    difficulties,
    terrains
}

export default {
    getAll,
    getByID,
    createForm,
    create,
    editForm,
    edit,
    remove,
    difficulties,
    terrains
};