import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URLSearchParams } from "node:url";

const port = 3000;

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

const server = http.createServer((req, res)=>{
    const url = req.url;

    switch(url) {
        case '/' :
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(
                fs.readFileSync(path.join(__dirname, "files", "index.html"))
            );
            res.end();
            break;
        case '/login' :
            if(req.method=="POST") {
                let body = '';
                req.on('data', chunk=>{
                    body+=chunk;
                });

                req.on('end', ()=>{
                    const formData = new URLSearchParams(body);
                    const Name = formData.get('name');
                    const surName = formData.get('surname');
                    const password = formData.get('password');

                    console.log(`Name:${Name}, Surname:${surName}, Password:${password}`);

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h2>Авторизація виконана успішно</h2>');
                })
            }
            else {
                res.writeHead(405, { 'Content-Type': 'text/plain' });
                res.end('Метод не підтримується');
            }
            break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Сторінку не знайдено</h1>');
    }
})
server.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
})