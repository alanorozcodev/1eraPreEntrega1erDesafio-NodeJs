import fs from "fs";



class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.secondaryIdCounter = 0; // Inicializamos el contador para el ID secundario
  }

  //Existe el archivo
  fileExist() {
    return fs.existsSync(this.filePath);
  }


  // Métodos Obtener Productos
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
      throw new Error("Error al obtener productos.");
    }
  }


   // Método Agregar Productos
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
        return newProduct;
      } else {
        throw new Error("No es posible agregar el producto");
      }
    } catch (error) {
      throw new Error("Error al agregar el producto.");
    }
  }


    // Método Obtener Productos Por ID primario
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find(product => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      throw new Error("Error al obtener producto por ID");
    }
  }

  // Método Obtener Productos Por ID secundario  
  async getProductBySecondaryId(id){
  try {
    const productsId = await this.getProducts();
    const filteredId = productsId.find(p=>p.secondaryId === id);
    if(filteredId){
        return filteredId;
    } else {
      throw new Error("El id solicitado no existe");
    }

} catch (error) {
  throw new Error(error.message)
}
}

    // Método Actualizar Productos

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

    // Método Borrar Productos
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


export default ProductManager;