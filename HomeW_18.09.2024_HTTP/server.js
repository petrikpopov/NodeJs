import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const port = 3000;

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'application/json');

    if(req.method==="GET"){
        res.statusCode = 200;
        res.end(JSON.stringify({message: 'Отримано GET-запит!'}));
    }
    else if (req.method==="POST"){
        let body = "";

        req.on('data', chunk => {
            body+=chunk;
        })

        req.on("end", ()=>{
            try {
                const parseBody = JSON.parse(body);
                res.statusCode = 200;
                res.end(JSON.stringify({
                    message: 'Отримано POST-запит!',
                    data: parseBody
                }))
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({error:'Неправильний формат JSON'}));
            }
        })
    }
    else {
        res.statusCode = 405;
        res.end(JSON.stringify({ message: 'Метод не підтримується' }));
    }
});
server.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
})
