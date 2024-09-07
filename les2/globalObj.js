// глобальный обьект в NodeJS - global

// const interval = setInterval(()=>{
//     console.log("SetI")
// },1000)

// setTimeout(()=>{
//     clearInterval(interval); // 4
// }, 4000);

// setImmediate(()=>{
//     console.log("set immedate") // 3
// });

// queueMicrotask(()=>{
//     console.log("Microtask")  // 1
// })

// Promise.resolve().then(()=>{
//     console.log("Promise") // 2
// })

// const Product = {
//     id: 1,
//     title: 'phone',
//     price: 30000
// };

// const ProductCup = {...Product} // глубокая копия
// ProductCup.id = 2;

// const product2 = structuredClone(Product) // глубокая копия - через метод
// console.table(Product)
// console.table(product2)

// const user = {
//     id:1,
//     name:"Ivan",
//     adress: {
//         street:"Sadova",
//         ap: 5
//     }
// }

// const user2 = {...user};
// user.adress.ap = 10;
// console.table(user2)
// console.table(ProductCup)

// const user2 = structuredClone(user);
// user.adress.ap = 100;
// console.log(user2);

// const str = "Hello";
// const encoding = btoa(str); // кодирую
// console.log(atob(encoding)) // разкодирую

// const decoding = atob(encoding);
// console.log(decoding)

// const start = performance.now();
// let sum = 0;
// for(let i = 0; i<1e9; i++){
//     sum+=i;
// }
// console.log(sum);
// console.log(`Time: ${performance.now() - start}`) // сколько выполняться будет данный код

fetch(
    'http://localhost:3000/user', {
        method: "POST",
        body: JSON.stringify(
            {
                name: "Nikita"
            }
        )
    }
).then(data=>data.json()).then(r => console.log(r)).catch()