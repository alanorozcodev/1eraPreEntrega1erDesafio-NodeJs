import fs from "fs";

class CartManager {

    constructor(filePath){
        this.filePath = filePath
    };

      // ¿Existe el archivo?
    fileExist(){
        return fs.existsSync(this.filePath);
    };

    // Métodos Obtener Carritos
    async getCarts() {
        try {
            if(this.fileExist()){
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");
                const carts = JSON.parse(contenido);
                return carts;
            } else {
                throw new Error("No se pudieron obtener los carritos")
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

    // Método Crear Carrito
    async createCart() {
        try {
            if(this.fileExist()){
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");
                const carts = JSON.parse(contenido);
                let idCart;
                carts.length === 0 ? idCart = 1 : idCart = carts.length + 1

                const newCart = {
                    idCart,
                    products: [],
                };
                carts.push(newCart);
                await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));
                return `Se creó un nuevo carrito ${newCart}`;
            } else {
                throw new Error("No se pudo crear el carrito")
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

    // Obtener Carrito por ID
    async getCartById(idCart){
        try {
            if(this.fileExist()){
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");
                const contenidoJsonEnString = JSON.parse(contenido);
                const idExists = contenidoJsonEnString.find((item) => item.idCart === idCart);
                if(idExists){
                    return `${JSON.stringify(idExists, null, 2)}`;
                } else {
                    return `Not Found`;
                };
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

    // Agregar Productos al Carrito
    async addProductInCart(cartId, productId) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const carts = JSON.parse(contenido);
                const cart = carts.find((item) => item.idCart === cartId);
                if (cart) {
                    const existingProduct = cart.products.find((product) => product.idProduct === productId);
                    if (existingProduct) {
                        existingProduct.quantity += 1;
                        console.log("Se aumentó en 1 la cantidad");
                    } else {
                        const newProduct = {
                            idProduct: productId,
                            quantity: 1,
                        };
                        cart.products.push(newProduct);
                    }
                    await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));
                    return `Se agregó el producto al carrito ${cartId}`;
                } else {
                    return `No se encontró el carrito con el ID ${cartId}`;
                }
            } else {
                throw new Error("No se pudo agregar el producto al carrito");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };   
};




export default CartManager;