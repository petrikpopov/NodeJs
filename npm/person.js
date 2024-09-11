export default class Person {
    #_Name;
    #_Age;
    #_Weight;
    
    constructor (name, age, weight) {
        this.#_Name = name;
        this.#_Age = age;
        this.#_Weight = weight;
    }

    setName(name) {
        this.#_Name = name
    }

    showInfo() {
        return `Name: ${this.#_Name}, Age: ${this.#_Age}, Weight: ${this.#_Weight} kg`;
    }
}
// module.exports = Person;