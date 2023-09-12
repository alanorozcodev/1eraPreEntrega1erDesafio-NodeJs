import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import { __dirname } from "../utils.js";
import path from "path";


export const managerProductService = new ProductManager(path.join(__dirname,"/files/Products.json"));
export const cartManagerService = new CartManager(path.join(__dirname,"/files/Carts.json"));