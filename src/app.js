import express from "express";
import cors from "cors";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";


import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";


const port =8080;
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors());

const httpServer = app.listen(port,() => console.log( `Servidor Funcionando en el puerto ${port} `));

//servidor de websocket
const io = new Server(httpServer);

//configuracion handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//Rutas del servidor
app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);


