import express, { Router } from "express";
import { cartManagerService } from "../persistence/index.js";


const router = Router();



export const cartRouter = Router();

// Para recibir información de las peticiones en formato JSON
router.use(express.json());

// Mostrar los Carritos
router.get("/", async(req,res)=>{
    try {
        const carts = await cartManagerService.getCarts();
        res.json({data:carts});
    } catch (error) {
        res.json({error:error.message});
    }
});

// Crear Carrito
router.post("/", async (req, res) => {
    try {
        const cartCreate = await cartManagerService.createCart();
        res.json({data:cartCreate})

    } catch (error) {
        res.json({error:error.message});
    }
});

// Listar los productos según ID de Carrito
router.get("/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const getCartById = await cartManagerService.getCartById(cartId);

        res.send(getCartById)
    } catch (error) {
        res.json({error:error.message});
    }
});

// Agregar productos al arreglo "products" del carrito seleccionado
// Solo se agrega el ID del producto y el quantify

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const log = await cartManagerService.addProductInCart(cartId, productId);
        console.log(log);

    } catch (error) {
        res.json({error:error.message});
    }
});

export {router as cartsRouter};

