
function isLoggedIn(req,res,next){
    console.log("authMiddleware:isLoggedIn");
    const member  = req.session.member;
    if(!member){
        return res.redirect("/?error=You+are+not+logged+in")
    }
    // lo ideal sería comprobar en base de datos que el usuario existe
    next();
}
function isNotLoggedIn(req,res,next){
    console.log("authMiddleware:isNotLoggedIn");
    const member = req.session.member;
    if(member){
        return res.redirect("/?error=You+are+already+logged+in")
    }
    next();
}

async function isAdmin(req,res,next){
    console.log("authMiddleware:isAdmin");
    const member  = req.session.member;
    if(!member){
        return res.redirect("/?error=You+are+not+logged+in")
    }
    if(member.isAdmin){
        next();
    }else{
        return res.redirect("/?error=You+are+not+a+admin")
    }
}


export {
    isLoggedIn,
    isNotLoggedIn,
    isAdmin
}