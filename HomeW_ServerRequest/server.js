import express from "express"
import path from "node:path"
import { products } from "./data/product.js"
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req,res) => {
    res.sendFile(path.join(import.meta.dirname, "index.html"))
});
app.get('/Product', (req,res) => {
    res.sendFile(path.join(import.meta.dirname, "product.html"))
});

app.get('/products', (req,res) => {
    res.status(200).json(products);
});
app.get('/products/:id_product', (req,res) => {
    const id = +req.params.id_product;
    const product = products.find((el) => el.id === id)
    res.status(200).json(product);
});
app.post("/products", (req,res) => {
    const new_id = products.length+1;
    const new_product = {id: new_id, ...req.body};
    products.push(new_product);
    console.log(req.body);
    res.status(201).json({status:"succes" });
});
app.put('/products/:id_product', (req, res) => {
    const id = +req.params.id_product;
    const { title, price } = req.body;
    const product = products.find((el) => el.id === id);
    if (product) {
        product.title = title;
        product.price = price;
        res.status(200).json({ status: "success", updatedProduct: product });
    } else {
        res.status(404).json({ status: "error", message: "Product not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});