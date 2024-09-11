import EventEmitter from "node:events";

const emitter = new EventEmitter();

const listner1 = () => {
    console.log("Listner 1, Hello");
}

const listner2 = () => {
    console.log("Listner 2, Hello");
}

emitter.on("connection", listner1);
// emitter.on("connection", listner2);
emitter.addListener("connection", listner2)
emitter.addListener("connection", ()=> {
    console.log("Listner 3, Hello")
})
emitter.once("connection", ()=>{
    console.log("Временный подпищик")
})
emitter.emit("connection")
console.log("==========")
// emitter.off("connection", listner1)
emitter.removeListener("connection", listner1)
emitter.emit("connection")
