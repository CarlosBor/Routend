import memberModel from "../models/member.js";
import {hash,compare} from "../utils/bcryptjs.js";

// function loginForm(req,res){
//     const {error,message} = req.query;
//     res.render("auth/login",{error,message});
// }
function registerForm(req,res){
    const {error,message} = req.query;
    res.render("auth/register",{error,message});
}

async function register(req,res){
    const {name,email,password,firstAid} = req.body;
    const oldMember = await memberModel.findOne({
        where:{
            email: email
        }
    })
    if (oldMember) {
        return res.redirect(`/auth/register?error=a+member+with+that+email+already+exists`);
    }
    const hashedPassword = await hash(password);
    const result = await memberModel.create({name,email,password:hashedPassword,isAdmin:false,firstAid});
    res.redirect('/auth/register?message=Registered+successfully');
}
// async function login(req,res){
//     const {email,password} = req.body;
//     const member = await memberModel.findOne({
//         where:{
//             email: email
//         }
//     })
//     if(!member){
//         return res.redirect("/login?error=invalid+credentials");
//     }
//     const result = await compare(password,member.password);
//     if(result){ // si la contraseña es correcta
        
//         const member = await memberModel.findByPk(member.idMember);
//         req.session.member = {
//             idMember:member.idMember,
//             isAdmin:member.isAdmin
//         }
//         return res.redirect("/?message=You+are+logged+in");
//     }else{
//         return res.redirect("/login?error=invalid+credentials");
//     }

// }

// function logout(req,res){
//     req.session.member = undefined;
//     res.redirect("/");
// }
export default {
    // loginForm,
    registerForm,
    register,
    // login,
    // logout
}