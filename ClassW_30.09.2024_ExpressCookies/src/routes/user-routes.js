import { Router } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../data/users.js";

const userRoutes = Router();
const secretAccessKey = process.env.ACCESS_SECRET_KEY;
const secretRefreshKey = process.env.REFRESH_SECRET_KEY;
const accessTokenExpiration = "15m"; 
const refreshTokenExpiration = "7d"; 

const refreshTokens = [];

function generateAccessToken(user) {
    return jwt.sign(user, secretAccessKey, { expiresIn: accessTokenExpiration });
}

function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, secretRefreshKey, { expiresIn: refreshTokenExpiration });
    refreshTokens.push(refreshToken);
    return refreshToken;
}

userRoutes.get('/', (req, res)=>{
    res.json(Users);
    res.end();
})

userRoutes.route('/signup')
    .get((req, res)=>{
        res.render("form_register");})
    .post((req, res)=>{
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

        // req.session.user = {
        //     login: req.body.login,
        //     email: req.body.email,
        // }
        const accessToken = generateAccessToken({ login: user.login });
        const refreshToken = generateRefreshToken({ login: user.login });

        res.json({ accessToken, refreshToken });

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

            const accessToken = generateAccessToken({ login: user.login });
            const refreshToken = generateRefreshToken({ login: user.login });

            res.json({ accessToken, refreshToken });
            // req.session.user = {
            //     login: user.login
            // };
            // console.log("User found:", user);
            
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

userRoutes.post('/token', (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, secretRefreshKey, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken({ login: user.login });
        res.json({ accessToken });
    });
});

userRoutes.get('/list_of_users', authenticateToken, (req, res)=>{
    let existUser = Users?.length > 0 ? 1 : 0;
    res.render("list_of_users", {Users, existUser});
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretAccessKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next(); 
    });
}

export default userRoutes