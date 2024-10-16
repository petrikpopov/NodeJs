import { users } from "../data/users.js";
import path from "node:path";
import bcrypt from "bcrypt";
export const checkUser = (req, res, next) => {
    if (req.session && req.session.user) {
        const { login, email } = req.session.user;
        res.locals.user = login;
        res.locals.email = email;
        res.locals.ext = users.find( el => el.login === req.session.user.login).ext;
    }
    next();
};

export const createUser = (req, res, next) => {
    console.log(req.body);
    if (
        req.body &&
        req.body.answer &&
        req.body.login &&
        req.body.email &&
        req.body.password &&
        req.body.confirm_password &&
        req.body.password == req.body.confirm_password
    ) {
        const { login, email, password } = req.body;
        const user = users.find(el => el.login === login || el.email === email);
        if (!user) {
            users.push({
                id: users.length + 1,
                login: login,
                email: email,
                password: bcrypt.hashSync(password, 10),
                ext: path.extname(req.file.originalname)
            });
            next();
            return;
        }
    }
    res.status(400);
    res.redirect("/");
}