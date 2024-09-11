import EventEmitter from "node:events";

const emitter = new EventEmitter();

class Buyer {
    #__NameBuyer;
    #__EmailBuyer;

    constructor (name, email) {
        this.#__NameBuyer = name;
        this.#__EmailBuyer = email
    }

    showAboutInfo (discount) {
        console.log(`Name:${this.#__NameBuyer}, Email:${this.#__EmailBuyer}, Discount:${discount}`);
    }
}

const Buyers = [
   new Buyer ('Petro', 'popov912@gmail.com'),
   new Buyer ('Ivan', 'ivanelPl32@gmail.com'),
   new Buyer ('Dima', 'dimaSh_12@gmail.com'),
]

Buyers.forEach((buyers)=>{
    emitter.on("sale", (discount)=>{
        buyers.showAboutInfo(discount);
    })
})

emitter.emit("sale", 20);
