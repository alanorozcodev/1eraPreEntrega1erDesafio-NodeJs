import fs from "fs";


class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.secondaryIdCounter = 0; // Inicializamos el contador para el ID secundario
  }

  fileExist() {
    return fs.existsSync(this.filePath);
  }

  async getProducts() {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.filePath, "utf-8");
        const contenidoJson = JSON.parse(contenido);
        return contenidoJson;
      } else {
        throw new Error("No es posible leer el archivo");
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al obtener productos.");
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.filePath, "utf-8");
        const contenidoJson = JSON.parse(contenido);

        if (contenidoJson.some(product => product.code === code)) {
          throw new Error("Ya existe un producto con ese codigo.");
        }
        console.log("Before increment:", this.secondaryIdCounter);
        const newProduct = {
          id: this.generateUniqueId(),
          secondaryId: ++this.secondaryIdCounter,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        console.log("After increment:", this.secondaryIdCounter);
        contenidoJson.push(newProduct);

        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(contenidoJson, null, "\t")
        );
        console.log("Nuevo producto agregado");
        return newProduct;
      } else {
        throw new Error("No es posible agregar el producto");
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al agregar el producto.");
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find(product => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.error("Error al obtener producto por ID:", error.message);
      throw new Error("Error al obtener producto por ID");
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(product => product.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      const updatedProduct = {
        ...products[productIndex],
        ...updatedFields,
        id
      };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, "\t")
      );
      console.log("Producto actualizado:", updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error("Error al actualizar producto:", error.message);
      throw new Error("Error al actualizar producto.");
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(product => product.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      const deletedProduct = products.splice(productIndex, 1)[0];
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, "\t")
      );
      console.log("Producto eliminado:", deletedProduct);
      return deletedProduct;
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
      throw new Error("Error al eliminar producto.");
    }
  }

  generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }


}

// Operaciones a realizar
(async () => {
  try {

    let initialCounter = 0;
  if (fs.existsSync("counter.txt")) {
  initialCounter = parseInt(fs.readFileSync("counter.txt", "utf-8"));
  }

    const manager = new ProductManager("./persistence/Products.json");
    manager.secondaryIdCounter = initialCounter;
    // Agrega producto
    const newProduct = await manager.addProduct(
      "producto prueba",
      "Este es un producto prueba",
      150,
      "Sin imagen",
      "bcd123",
      20
    );
    console.log(newProduct);

    /* Actualiza producto
    const updatedFields = {
      title: "Producto actualizado",
      price: 250
    };
    await manager.updateProduct(newProduct.id, updatedFields);

    // Elimina producto
    const deletedProduct = await manager.deleteProduct(newProduct.id);
    console.log("Producto eliminado:", deletedProduct);

    // Probar Busca por ID
    const products = await manager.getProducts();
    if (products.length > 0) {
      const productFound = await manager.getProductById(products[0].id);
      console.log("Producto encontrado por ID:", productFound);
    } else {
      console.log("No hay productos en la lista.");
    }*/

    fs.writeFileSync("counter.txt", manager.secondaryIdCounter.toString(), "utf-8");
  } catch (error) {
    console.log(error.message);
  }


})();


export default ProductManager;
