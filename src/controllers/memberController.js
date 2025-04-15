import memberModel from "../models/member.js";
import { hash, compare } from "../utils/bcryptjs.js";

async function getAll(req, res) {
    console.log("memberController:getAll req.body: ", req.body);
    console.log("req.session: ", req.session);
    const members = await memberModel.findAll();
    res.render("member/list", { members });
}

async function getByID(req, res) {
    console.log("memberController:getByID req.body: ", req.body);
    const id = req.params.id;
    const member = await memberModel.findByPk(id);
    res.render("member/show", { member }); // la ruta de render es a partir de la carpeta views, no la del memberr
}


async function editForm(req, res) {
    console.log("memberController:editForm req.params: ", req.params);
    const id = req.params.id;
    const member = await memberModel.findByPk(id);
    if (!member) {
        res.redirect("/member")
    }
    console.log("usuario a editar: ", member);
    res.render("member/edit", { member });
}
async function edit(req, res) {
    console.log("memberController:edit req.body: ", req.body);
    console.log("req.body: ", req.body);
    const id = req.params.id;
    const { name, email, password, firstAid } = req.body; // los datos para modificar el member

    const member = await memberModel.findByPk(id);
    member.name = name;
    member.email = email;
    member.password = await hash(password);
    console.log("req.session.member: ", req.session.member);
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
    console.log("memberController:remove req.params: ", req.params);
    const id = req.params.id;
    const member = await memberModel.findByPk(id);
    try {
        if (member) {
            if (member.isAdmin) {
                console.log("Administrator user cannot be deleted");
                return res.redirect("/member?error=Administrator+user+cannot+be+deleted");
            } else {
                await member.destroy();
            }
        } else {
            console.log("User id " + id + " not found");
            return res.redirect("/member?error=User+id+" + id + "+not+found");
        }
    } catch (error) {
        console.error("Error in user deletion:", error);
        return res.status(500).send("Error in user deletion");
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