import EventEmitter from "node:events";

const emitter = new EventEmitter();


emitter.on("click", (data)=>{
    console.log("Clicked...", data);
})

emitter.emit("click", {title:"Add", color:"Red"});
emitter.emit("click", {title:"Cancel", color:"Green"})