import path from "node:path";
import fs from "node:fs";
import {Buffer} from "node:buffer"

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname,"files");
const pathToFile = path.join(pathToFolder, "data.txt");

const reatStream = fs.createReadStream(pathToFile);
const wrireStream = fs.createWriteStream(path.join(pathToFolder,"newData.txt"));

// reatStream.on('data', (chunk)=>{
//     console.log(`start chank\n`);
//     console.log(chunk);
//     wrireStream.write(chunk.toString());
//     console.log(chunk.length);
//     console.log(`end chank\n`);

//     reatStream.pause();// остановка

//     setTimeout(()=>{
//         reatStream.resume();
//     },2000)
// });

// reatStream.on('open', ()=>{
//     console.log(`Open`)
// })

// reatStream.on('close', ()=>{
//     console.log(`Close`)
// })

// reatStream.on('end', ()=>{
//     console.log(`End`)
// })

reatStream.pipe(wrireStream); // r-w











