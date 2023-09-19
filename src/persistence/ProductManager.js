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

//  Métodos Agregar Productos
async createProduct(productInfo){
  try {
      if(this.fileExist()){
          const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
          const products = JSON.parse(contenidoString);
          let newId=1;
          if(products.length>0){
              newId=products[products.length-1].id+1;
          }
          productInfo.id=newId;
          products.push(productInfo);
          await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
          return "Producto agregado";
      } else {
          throw new Error("No se pudieron obtener los productos");
      }
  } catch (error) {
      throw error;
  }
};


    // Método Obtener Productos Por ID primario
    async getProductById(productId){
      try {
          if(this.fileExist()){
              const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
              const products = JSON.parse(contenidoString);
              const product = products.find(p=>p.id === productId);
              if(!product){
                  throw new Error("El producto no existe");
              }
              return product;
          } else {
              throw new Error("No se pubo obtener el producto");
          }
      } catch (error) {
          throw error;
      }
  };



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

}


export default ProductManager;