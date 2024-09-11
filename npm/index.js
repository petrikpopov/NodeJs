// const Person = require("./person");
import Person from "./person.js";
const person =  new Person("Petro", 20, 86);
console.log(person.showInfo())


// если я исправляю какойто баг , то я меняю patch на один выше "version": "1.1.0", если я добавил новый функционал , но при этом не меняется интерфейс , то я меняю минормую версию на одну выше, мажорная версия меняется на 1 когда мы изменили интерфейс.