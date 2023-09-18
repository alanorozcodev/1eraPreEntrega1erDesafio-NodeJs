import express, { Router }  from "express";
import { managerProductService } from "../persistence/index.js";

const router = Router();

router.use(express.json());


//http://localhost:8080/api/products
router.get("/",async (req,res)=>{
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
        res.json({status:"error",message:error.message});
    }
});


//http://localhost:8080/api/products/
router.get("/:pid", async(req,res)=>{
    try {
        const id = parseInt(req.params.pid);
        const product = await managerProductService.getProductBySecondaryId(id);
        res.json({message: "Producto encontrado por ID:",data:product});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

// Agregar Producto
router.post("/", async(req,res) => {
try {
    const newProduct = req.body;
    await managerProductService.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock);
    res.json({"Producto Agregado": newProduct});

}catch(error) {
        res.send(error.message);
    }
});

// Actualizar Producto
router.put("/:pid", async(req,res)=>{
    try {
        const productId = parseInt(req.params.id);
        const putProduct = req.body;
        await managerProductService.updateProduct(productId, putProduct.title, putProduct.description, putProduct.price, putProduct.thumbnail, putProduct.code, putProduct.stock);
        res.json({"Producto Actualizado": putProduct});
    } catch (error) {
        res.send(error.message);
    }
})

//Eliminar Producto
router.delete("/:pid", async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        await productsService.deleteProduct(productId);
    } catch (error) {
        res.send(error.message);
    }
})

export {router as productsRouter};

