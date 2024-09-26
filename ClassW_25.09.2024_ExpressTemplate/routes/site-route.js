import { Router } from "express";
const siteRouters = Router();

siteRouters.get('/', (req, res)=>{
    res.render('home', {title: "My App"});
});

siteRouters.get('/contacts', (req, res)=>{
    res.render('contacts', {contacts:[
        "str Sadova 3", "str Sadova 2"
    ]})
});

export default siteRouters;