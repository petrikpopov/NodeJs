import { Router } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { Users } from "../data/users.js";
const userRoutes = Router();

userRoutes.route('/signup')
    .get((req, res)=>{
        res.render("form_signup");})
    .post((req, res)=>{
        // console.log(req.body);
        // console.log(validator.isEmail(req.body.email));
        // console.log(bcrypt.hashSync(req.body.password, 10)); //хеш
        // bcrypt.compareSync();

        //HomeWork
        if(!req.body.login || !req.body.email || !req.body.password || !req.body.confirm_password) {
            return res.status(400).send('Все поля обязательны для заполнения.');
        }
        if(!validator.isEmail(req.body.email)) {
            return res.status(400).send('Неверный формат email.');
        }
        if(!validator.isLength(req.body.password, {min:8})){
            return res.status(400).send('Пароль должен содержать не менее 8 символов.');
        }
        if(req.body.password !== req.body.confirm_password) {
            return res.status(400).send('Пароли не совпадают.');
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        console.log({
            login: req.body.login,
            email: req.body.email,
            hashedPassword: hashedPassword
        });

        Users.push({
            login: req.body.login,
            email: req.body.email,
            hashedPassword: hashedPassword
        })

        console.log(Users);

        res.cookie("user", req.body.login, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        });
        res.redirect('/')
    });

userRoutes.get('/logout', (req, res) => {
    res.clearCookie("user");
    res.redirect('/');
});
export default userRoutes