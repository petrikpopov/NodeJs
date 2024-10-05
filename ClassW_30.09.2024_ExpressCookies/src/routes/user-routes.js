import { Router } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { Users } from "../data/users.js";

const userRoutes = Router();

userRoutes.get('/', (req, res)=>{
    res.json(Users);
    res.end();
})

userRoutes.route('/signup')
    .get((req, res)=>{
        res.render("form_register");})
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
            id: Users.length + 1, 
            login: req.body.login,
            email: req.body.email,
            hashedPassword: hashedPassword
        })

        console.log(Users);

        req.session.user = {
            login: req.body.login,
            email: req.body.email,
        }
        res.redirect('/')
    });

userRoutes.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

userRoutes.route('/signin')
    .get((req, res)=>{
        res.render("form_auth");
    })
    .post((req, res) => {
       
        const {login, password} = req.body;
        const user = Users.find(el => el.login === login);
        if (user) {
            req.session.user = {
                login: user.login
            };
            console.log("User found:", user);
            
            res.redirect('/');
        } else {
            console.log("User not found.");
            res.send("Invalid login or password.");
        }

        console.log({
            login: req.body.login,
            password: req.body.password
        });
    });

export default userRoutes