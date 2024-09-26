import { Router } from "express";
const siteRouters = Router();

siteRouters.get('/', (req, res)=>{
    res.render('home')
});
siteRouters.get('/aboutMy', (req, res)=>{
    res.render('aboutMy')
});
siteRouters.get('/socialLinks', (req, res)=>{
    res.render('socialLinks')
});
siteRouters.get('/notMysocialLinks', (req, res)=>{
    res.render('notMysocialLinks')
});
siteRouters.get('/aboutMyWork', (req, res)=>{
    res.render('aboutMyWork')
});
siteRouters.get('/aboutMyBike', (req, res)=>{
    res.render('aboutMyBike')
});
export default siteRouters;