import express, { response } from "express";
import ProductManager from "./persistence/ProductManager.js"

const managerProductService = new ProductManager("./src/files/Products.json");


const port =8080;

const app = express();

app.listen(port,() => console.log("Servidor Funcionando"));

//Rutas del servidor

app.get("/products", async(req,res)=> {
try {
    const limit = req.query.limit;
    const limitNumber = parseInt(limit);
    const products = await managerProductService.getProducts();
    if(limit){
        const productsLimit = products.slice(0,limitNumber);
        res.send(productsLimit);
    } else {
        res.send(products);
    }
    

} catch (error) {
    res.send(error.message)
}
});

app.get("/products/:pid", async(req,res)=> {
    try {
        const id = parseInt(req.params.pid);
        const productsId = await managerProductService.getProducts();
        const filteredId = productsId.find(p=>p.secondaryId === id);
        if(filteredId){
            res.send(filteredId);
        } else {
            res.send("El id solicitado no existe");
        }
    
    } catch (error) {
        res.send(error.message)
    }
    });


