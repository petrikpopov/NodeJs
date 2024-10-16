import { Router } from "express";
import { createUser } from "../middleware/user-middleware.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "node:path";
import { users } from "../data/users.js";
import multer from "multer";
import nodemailer from "nodemailer";

const userRoutes = Router();
const secretAccessKey = process.env.ACCESS_SECRET_KEY;
const secretRefreshKey = process.env.REFRESH_SECRET_KEY;
const accessTokenExpiration = "30m";
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

const storage = multer.diskStorage({
    destination: "files/",
    filename: (req, file, cb) => {
        cb(null, req.body.login + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

userRoutes.get('/', (req, res) => {
    res.json(users);
    res.end();
});

userRoutes.route('/signup')
    .get((req, res) => {
        res.render("form_register");
    })
    .post(upload.single("file"), createUser, (req, res) => {
        if (!req.body.login || !req.body.email || !req.body.password || !req.body.confirm_password) {
            return res.status(400).send('Все поля обязательны для заполнения.');
        }

        if (!validator.isEmail(req.body.email)) {
            return res.status(400).send('Неверный формат email.');
        }

        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).send('Пароли не совпадают.');
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        users.push({
            id: users.length + 1,
            login: req.body.login,
            email: req.body.email,
            hashedPassword: hashedPassword
        });

        req.session.user = {
            login: req.body.login,
            ext: path.extname(req.file.originalname),
            email: req.body.email,
            hashedPassword: hashedPassword
        };
        console.log(req.session.user.hashedPassword);

        res.redirect('/');
    });

userRoutes.route('/signin')
    .get((req, res) => {
        res.render("form_auth");
    })
    .post((req, res) => {
        const { login, password } = req.body;
        const user = users.find(el => el.login === login);
        if (user) {
            if (user.password) {
                const isMatch = bcrypt.compareSync(password, user.password);

                if (isMatch) {
                    req.session.user = { login: user.login };
                    return res.redirect('/');
                } else {
                    return res.status(400).send('Неверный пароль.');
                }
            } else {
                return res.status(500).send('Хэш пароля не найден для данного пользователя.');
            }
        } else {
            return res.status(400).send('Пользователь не найден.');
        }
    });


userRoutes.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
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

userRoutes
    .route("/feedback")
    .get((req, res) => {
        res.render("feedback");
    })
    .post((req, res) => {
        let trans = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "mohseninikita9@gmail.com",
                pass: "",
            },
            tls: {
                rejectUnauthorized: true,
                minVersion: "TLSv1.2",
            },
        });
        let mailOpt = {
            from: "Nik <email>",
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.message,
        };
        let result = "";
        trans.sendMail(mailOpt, (err, info) => {
            console.log(err, info);
            if (err) {
                result = { status: "Error" };
            } else {
                {
                    result = { status: "OK" };
                }
            }
            console.log(result);
        });
        res.redirect("/");
    });

export default userRoutes;
