import express from "express";
import cors from "cors";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { managerProductService } from "./persistence/index.js";


import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";


const port =8080;
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors());

//Middleware
app.use(express.static(path.join(__dirname, "/public")));


const httpServer = app.listen(port,() => console.log( `Servidor Funcionando en el puerto ${port} `));

//Servidor de websocket
const io = new Server(httpServer);

//Configuracion handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//Rutas del servidor
app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);

//Socket Server
io.on("connection", async (socket)=> {
    console.log("Cliente conectado");
    const products = await managerProductService.getProducts();
    socket.emit("productsArray", products);

    //Recibir productos del cliente
    socket.on("addProduct", async (productData)=> {
        const results = await managerProductService.addProduct(productData);
        const products = await managerProductService.getProducts();
        io.emit("productsArray", products);
    });

    //Borrar productos del cliente
    socket.on("deleteProduct", async (deletedId) => { 
    const newProducts = await managerProductService.deleteProduct(deletedId);
    const products = await managerProductService.getProducts();
        io.emit("productsArray", products);
    });


});


