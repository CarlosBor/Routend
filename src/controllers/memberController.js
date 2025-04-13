import memberModel from "../models/member.js";

async function getAll(req, res) {
    console.log("en getAll req.body: ", req.body);
    console.log("req.session: ", req.session);
    if (!req.session) {
        console.error("Not logged in");
        res.status(500).send("Not logged in");
    } else {
        // if (req.session.member.isAdmin) {
        const members = await memberModel.findAll();
        res.render("member/list", { members });
        // } else {
        //     console.error("Only admins can access this page");
        //     res.status(500).send("Only admins can access this page");
        // }
    }
}

async function getByID(req, res) {
    console.log("en getByID req.body: ", req.body);
    const id = req.params.id;
    const member = await memberModel.findByPk(id);
    res.render("member/show", { member }); // la ruta de render es a partir de la carpeta views, no la del memberr
}

// async function createForm(req, res) {
//     console.log("en createForm req.params: ", req.params);
//     res.render("member/create", { difficulties, terrains });
// }
// async function create(req, res) {
//     console.log("en create req.body: ", req.body);
//     const { name, email, password, firstAid } = req.body;
//     try {
//         const response = await memberModel.create({
//             name: name,
//             email: email,
//             password: password,
//             isAdmin: false,
//             firstAid: firstAid
//         });
//     } catch (error) {
//         console.error("Error al crear el usuario:", error);
//         res.status(500).send("Error al crear el usuario");
//     }
//     res.redirect("/member");
// }
async function editForm(req, res) {
    console.log("en editForm req.params: ", req.params);
    const id = req.params.id;
    const member = await memberModel.findByPk(id);
    if (!member) {
        res.redirect("/member")
    }
    console.log("usuario a editar: ", member);
    res.render("member/edit", { member });
}
async function edit(req, res) {
    console.log("en edit req.body: ", req.body);
    const id = req.params.id;
    const { name, email, password, isAdmin, firstAid } = req.body; // los datos para modificar el member

    const member = await memberModel.findByPk(id);
    member.name = name;
    member.email = email;
    member.password = password;
    member.isAdmin = isAdmin;
    member.firstAid = firstAid;
    try {
        await member.save();
    } catch (error) {
        console.error("Error al editar el usuario:", error);
        res.status(500).send("Error al editar el usuario");
    }

    res.redirect("/member/" + id);
}

async function remove(req, res) {
    console.log("en remove req.params: ", req.params);
    const id = req.params.id;
    const member = await memberModel.findByPk(id);
    try {
        if (member) {
            if (member.isAdmin) {
                console.log("No se puede eliminar al administrador");
            } else {
                await member.destroy();
            }
        } else {
            console.log("No se pudo encontrar el usuario");
            res.redirect("/member");
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).send("Error al eliminar el usuario");
    }
    res.redirect("/member");
}



export {
    getAll,
    getByID,
    //createForm,
    // create,
    edit,
    remove,
}

export default {
    getAll,
    getByID,
    //createForm,
    //create,
    editForm,
    edit,
    remove,
};