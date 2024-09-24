import express from "express";
import { products} from "./data/products.js";
import path from "node:path";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(express.static("public"));

app.get('/', (req, res)=>{
    res.sendFile(path.join(import.meta.dirname, "index.html"));
})

app.get('/', (req, res)=>{
    // res.send("Welcome to Node Js server!!");
    
    res.status(200).json(products)
})

// app.get('/:id_product', (req, res)=>{
//     // res.send("Welcome to Node Js server!!");
//     const id = +req.params.id_product;
//     const product = products.find((el)=>el.id === id);
//     res.status(200).json(product)
// })

app.get('/products/:id_product', (req, res)=>{
    // res.send("Welcome to Node Js server!!");
    const id = +req.params.id_product;
    const product = products.find((el)=>el.id === id);
    res.status(200).json(product)
})

app.post('/products', (req, res)=>{
    const newId = products.length + 1;
    const newProduct = {id:newId, ...req.body}; 
    products.push(newProduct)
    res.status(201).json(newProduct);

})

app.post('/', (req, res)=>{
    const newId = products.length + 1;
    const newProduct = {id:newId, ...req.body}; 
    products.push(newProduct)
    res.status(201).json(newProduct);

})
app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`)
})