
function isLoggedInSession(req,res,next){
    const user  = req.session.user;
    if(!user){
        return res.redirect("/login?error=You+are+not+logged+in")
    }
    // lo ideal sería comprobar en base de datos que el usuario existe
    next();
}

async function isAdmin(req,res,next){
    const user  = req.session.user;
    if(!user){
        return res.redirect("/login?error=You+are+not+logged+in")
    }
    if(user.isAdmin){
        next();
    }else{
        return res.redirect("/login?error=You+are+not+a+admin")
    }
}


export {
    isLoggedInSession,
    isAdmin
}