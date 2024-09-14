import path from "node:path";
import fs from "node:fs";

const __dirName = import.meta.dirname;
const myDir = path.join(__dirName, "files");
if(!fs.existsSync(path.join(__dirName, "files"))){
    fs.mkdirSync(myDir);
}
const buff = Buffer.from(`Hello from NodeJs\n`);
const ourFile = path.join(myDir, "data.txt");
// fs.writeFileSync(path.join(myDir, "data.txt"), buff);
// fs.appendFileSync(path.join(myDir, "data.txt"), buff);
const content = fs.readFileSync(ourFile);
console.log(`Content:${content.toString()}`)





