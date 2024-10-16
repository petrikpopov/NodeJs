import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import path from "node:path";
import cookieParser from "cookie-parser";
import "dotenv/config";
import siteRoutes from "./routes/site-routes.js";
import navbar from "./middleware/navbar-middleware.js";
import userRoutes from "./routes/user-routes.js";
import { checkUser } from "./middleware/user-middleware.js"

import { createClient } from "redis";
import RedisStore from "connect-redis";

const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
});
const clientRedis = createClient({
    url: "redis://localhost:6379",
});

const storeRedis = new RedisStore({
    client: clientRedis,
    prefix: "node_sess:",
    ttl: 86400, // Session Exp (1 day)
})

async function run() {
    await clientRedis.connect().catch(console.error);
    const app = express();
    app.use(express.static("public"));
    app.use(cookieParser());
    app.use(session({
        store: storeRedis,
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 },
    }))
    app.use(checkUser);
    app.use(navbar);
    app.engine("hbs", hbs.engine);
    app.set("view engine", "hbs");
    app.set("views", path.join("src", "views"));
    app.use(express.urlencoded({ extended: true }));
    app.use(siteRoutes);
    app.use('/user', userRoutes);
    app.use(express.static(path.join("files")));


    app.listen(PORT, () =>
        console.log(`Server is running http://localhost:${PORT}`)
    );
}

run();