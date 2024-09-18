import path from "node:path";
import fs from "node:fs";
import { Buffer } from "node:buffer";
import { Transform } from "node:stream";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const pathToFolder = path.join(__dirname, "chunk");
const pathToFile = path.join(pathToFolder, "chunk.txt");

const upperCaseTransformer = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

fs.access(pathToFolder, (err) => {
    if (err) {
        if (err.code === "ENOENT") {
            fs.mkdir(pathToFolder, (err) => {
                if (err) {
                    console.log(err);
                    process.exit();
                }
                createFileAndStream();
            });
        } else {
            console.log(err);
            process.exit();
        }
    } else {
        createFileAndStream();
    }
});

function createFileAndStream() {
    const myBuffer = Buffer.from("Hello NodeJS! This is a test text.");
    
    fs.writeFile(pathToFile, myBuffer, (error) => {
        if (error) {
            console.log(error);
            process.exit();
        }
        const readableStream = fs.createReadStream(pathToFile, { encoding: "utf-8" });
        readableStream.pipe(upperCaseTransformer).pipe(process.stdout);
    });
}
