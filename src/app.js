import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import cors from "cors";


const port =8080;
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.listen(port,() => console.log( `Servidor Funcionando en el puerto ${port} `));

//Rutas del servidor
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);


