import path from "node:path";
import fs from "node:fs";
import {Buffer} from "node:buffer"

const buffer = Buffer.from("Hello NodeJS");

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname,"files");
const pathToFile = path.join(pathToFolder, "data.txt");

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

    fs.writeFile(pathToFile, buffer , (err)=>{
        if(err){
            console.log(err);
            process.exit();
        }
        fs.readFile(pathToFile, (err, data)=>{
            if(err==null){
                console.log(data.toString());
            }
        })
    })
})