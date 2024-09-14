import {Buffer} from "node:buffer";
import crypto from 'crypto';
import fs from "node:fs";

//1
const myBuffer = Buffer.from("Hello, Node.js");
console.log(myBuffer.toString());

fs.writeFileSync("text.txt", myBuffer, (err)=>{
    if(err){
        throw err;
    }
})

//2 

const bufferRandom = crypto.randomBytes(50);
const pathFile = "randomData.txt";
fs.writeFileSync(pathFile, bufferRandom);
console.log(`Буфер записано у файл ${pathFile}`);

const readFile = fs.readFileSync(pathFile);
console.log(`Buffer:${readFile}`);
console.log(`Normal text:${readFile.toString('hex')}`);

//3
const message = "Hello from NodeJS"
const buffer2 = Buffer.from(message);
console.log(buffer2)
console.log(buffer2.toString());

//4
const buff1 = Buffer.from("Hello from ")
const buff2 = Buffer.from("NodeJs")
const arr = [buff1, buff2];
const buf = Buffer.concat(arr);
console.log(buf);
console.log(buf.toString());

const pathFileConcat = "concatFile.txt";
fs.writeFileSync(pathFileConcat, buf);
console.log(`Конкатенированные буферы записаны в файле ${pathFileConcat}`);

