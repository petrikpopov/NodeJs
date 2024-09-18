// const simple = (value)=>{
//     return new Promise((resolve, reject)=>{
//         if(value>0){
//             resolve("value > 0");
//         }else {
//             reject("value < 0 || value === 0")
//         }
//     })
// }

// simple(-2).then(data=>{
//     console.log(data);
// }).catch (err=>{
//     console.log(err)
// })

import path from "node:path";
import fs from "node:fs/promises";
import {Buffer} from "node:buffer"

const buffer = Buffer.from("Hello NodeJS");

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname,"files");
const pathToFile = path.join(pathToFolder, "data.txt");

fs.writeFile(pathToFile, buffer).then(()=>{
    console.log("Файл был успешно создан!")
    fs.readFile(pathToFile).then(data=>{
        console.log(data.toString())
    }).catch(err=>{
        console.log(err);
    })
}).catch(err=>{
    console.error(err)
});