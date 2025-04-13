
function isLoggedIn(req,res,next){
    const member  = req.session.member;
    if(!member){
        return res.redirect("/auth/login?error=You+are+not+logged+in")
    }
    // lo ideal sería comprobar en base de datos que el usuario existe
    next();
}
function isNotLoggedIn(req,res,next){
    const member  = req.session.member;
    if(member){
        return res.redirect("/")
    }
    next();
}

async function isAdmin(req,res,next){
    const member  = req.session.member;
    if(!member){
        return res.redirect("/auth/login?error=You+are+not+logged+in")
    }
    if(member.isAdmin){
        next();
    }else{
        return res.redirect("/auth/login?error=You+are+not+a+admin")
    }
}


export {
    isLoggedIn,
    isNotLoggedIn,
    isAdmin
}