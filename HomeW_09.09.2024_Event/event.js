import EventEmitter from "node:events";

const emitter = new EventEmitter();

//// 1

emitter.on("click", ()=> {
    console.log("Hello, i'm message from first click!")
})
emitter.on("click", ()=> {
    console.log("Hello, i'm message from secont click!")
})
emitter.on("click", ()=> {
    console.log("Hello, i'm message from third click!")
})

emitter.emit("click");

//// 2

const firstError = () => {
    console.log("Hello, i'm error message first!")
}
const secontError = () => {
    console.log("Hello, i'm error message second!")
}
const thirdError = () => {
    console.log("Hello, i'm error message third!")
}

emitter.on("error", firstError)
emitter.on("error", secontError)
emitter.on("error", thirdError)

console.log("Первый емитер");
emitter.emit("error");

console.log("Второй емитер");
emitter.emit("error");

console.log("Tретий емитер");
emitter.emit("error");

console.log("Удаляю второй емитер");
emitter.removeListener("error", secontError);

console.log("Удален второй емитер");
emitter.emit("error");

// console.log(emitter.listeners("error"))
// console.log(emitter.getMaxListeners("error"))

console.log(`Default: ${emitter.getMaxListeners("error")}`);
emitter.setMaxListeners(20);
console.log(`Count of listner: ${emitter.getMaxListeners("error")}`);


