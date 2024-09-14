import fs from "node:fs";

const content = fs.readFileSync('./index.txt', {encoding: "utf-8"});
console.log(content);
import {Buffer} from "node:buffer";

//1

const buffer1 = Buffer.alloc(8);
buffer1.write('hello');
console.log(buffer1.toString());

//2
const message = "Hello from NodeJS"
const buffer2 = Buffer.from(message);
console.log(buffer2)
console.log(buffer2.toString());
console.log(buffer2.toString('utf-8', 0, 5));
console.log(`Length: ${buffer2.length}`)

const b1 = Buffer.from("Hello");
const b2 = Buffer.from("Petro");
// b1.copy(b2);
// console.log(b2.toString());
console.log(b1.compare(b2));

