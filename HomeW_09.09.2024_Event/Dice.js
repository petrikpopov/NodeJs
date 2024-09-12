import EventEmitter from "node:events";

const emitter = new EventEmitter();

class Dice {
    #__minValue = 1;
    #__maxValue = 6;
    
    throwDice() {
        const result = Math.floor(Math.random() * (this.#__maxValue - this.#__minValue + 1)) + this.#__minValue;
        emitter.emit("rolled", result);
    }
}

const dice = new Dice();

emitter.on("rolled", (result) => {
    console.log(`Dice rolled: ${result}`);
});

for (let i = 0; i<6; i++){
    dice.throwDice();
} 

