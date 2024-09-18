import path from "node:path";
import fs from "node:fs";
import {Buffer} from "node:buffer"

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname,"files");
const pathToFile = path.join(pathToFolder, "text.txt");

const outputWithDelay = (text) => {
    let i = 0;
    const myInterval = setInterval(()=>{
        if(i<text.length){
            process.stdout.write(text[i]);
            i++;
        }else {
            clearInterval(myInterval);
        }
    },1000)
}

fs.access(pathToFolder, (error)=>{
    if(error){
        if(error.code === "ENOENT"){
            fs.mkdir(pathToFolder, (err)=>{
                if(err){
                    console.log(error);
                    process.exit();
                }
            })
        } else {
            console.log(error);
            process.exit();
        }
    }

    const myBuffer = Buffer.from("Hello NodeJS! This is a test text.");
    fs.writeFile(pathToFile, myBuffer, (err)=>{
        if(err){
            console.log(err);
            process.exit();
        }

        fs.readFile(pathToFile, (err, data) => {
            if (err) {
                console.error(err);
                process.exit();
            }

            outputWithDelay(data.toString());
        })
    })
})