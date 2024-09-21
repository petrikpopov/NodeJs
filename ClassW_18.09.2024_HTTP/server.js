import http from "node:http";
import path from "node:path";
import fs from "node:fs"
// http.createServer().listen(3000, ()=>{
//     console.log("Server is running http://localhost:3000")
// });

const port = 3000;

const mineTypes = {
    '.css':"text/css",
    '.js':"text/javascript",
    '.png':"image/png"
}

const server = http.createServer((req, res)=>{
    //res.write("Hello from NideJs");
    // res.writeHead(201, "Content type", "text/html");
    // res.write(`<div><h1>Hello</h1></div>`)
    // console.log(req.url, req.method);
    const url = req.url;
    switch(url) {
        case '/' :
            res.write(
                fs.readFileSync(path.join(import.meta.dirname, "public", "pages", "index.html"))
            );
            res.end();
           break;
        case '/contact' :
            res.write(
                fs.readFileSync(path.join(import.meta.dirname, "public", "pages", "contact.html"))
            )
            res.end();
            break;
        default:
            
            break;
    }
    res.end();
});
server.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
})