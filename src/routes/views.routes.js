import { Router } from "express";
import { managerProductService } from "../persistence/index.js";


const router = Router();

router.get("/", async (req,res) => {
    const products = await managerProductService.getProducts();
    res.render("home", {products});
});

router.get("/realtimeproducts", (req,res) => {
    
    res.render("realTime");
});



export {router as viewsRouter};