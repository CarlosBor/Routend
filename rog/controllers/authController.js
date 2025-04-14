import memberModel from "../models/member.js";
import { hash, compare } from "../utils/bcryptjs.js";


function registerForm(req, res) {
    console.log("authController:registerForm req.query: ", req.query);
    const { error, message } = req.query;
    res.render("auth/register", { error, message });
}

async function register(req, res) {
    console.log("authController:register req.body: ", req.body);
    const { name, email, password, firstAid } = req.body;
    const oldMember = await memberModel.findOne({
        where: {
            email: email
        }
    })
    if (oldMember) {
        return res.redirect(`/auth/register?error=a+member+with+that+email+already+exists`);
    }
    const hashedPassword = await hash(password);
    const result = await memberModel.create({ name, email, password: hashedPassword, isAdmin: false, firstAid });
    res.redirect('/auth/register?message=Registered+successfully');
}

function loginForm(req, res) {
    console.log("authController:loginForm req.query: ", req.query);
    const { error, message } = req.query;
    res.render("auth/login", { error, message });
}

async function login(req, res) {
    console.log("authController:login req.body: ", req.body);
    const { email, password } = req.body;
    const member = await memberModel.findOne({
        where: {
            email: email
        }
    })
    if (!member) {
        return res.redirect("/auth/login?error=invalid+credentials1");
    }
    console.log("member encontrado: ", member);
    console.log("password: ", password);
    const result = await compare(password,member.password);
    console.log("result: ", result);
    if (result) { // si la contraseña es correcta
        req.session.member = {
            idMember: member.idMember,
            isAdmin: member.isAdmin,
            name: member.name,
        }
        return res.redirect("/");
    } else {
        return res.redirect("/auth/login?error=invalid+credentials2");
    }

}

function logout(req, res) {
    console.log("authController:logout");
    req.session.member = undefined;
    res.redirect("/");
}

export default {
    loginForm,
    registerForm,
    register,
    login,
    logout
}