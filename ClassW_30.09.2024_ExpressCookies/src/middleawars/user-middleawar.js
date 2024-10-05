export const checkUser = (req, res,next)=>{
    if(req.session && req.session.user) {
        const {login, email} = req.session.user;
        res.locals.user = login;
        res.locals.email = email;
    }else {
        res.locals.user = null; 
    }
    next();
}