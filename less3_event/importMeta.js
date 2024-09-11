// const obj = {
//     name: "Ivan",
//     age: 24
// };

// const obj1 = {
//     name: "Petro",
//     age: 20
// };

// console.log(obj);
// console.log(obj1);

// console.log("dirname:", __dirname);
// console.log("filename:", __filename);

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;
console.log("dirname:",__dirname);
console.log("filename:",__filename);