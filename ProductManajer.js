class ProductManager {
    constructor() {
    this.products = [];
    }
    getProducts() {
    return this.products;
    }
    addProduct(title, description, price, thumbnail, code, stock) {
    if (this.products.some(product => product.code === code)) {
        throw new Error("Ya existe un producto con ese codigo.");
    }
    const newProduct = {
        id: this.generateUniqueId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };
        this.products.push(newProduct);
        return newProduct;
    }

    getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
        throw new Error("Producto no encontrado");
    }
    return product;
    }

    generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    }





  // Crear instancia de ProductManager
    const productManager = new ProductManager();

  // Llamar getProducts en la instancia recién creada (debería devolver [])
    console.log(productManager.getProducts());

  // Llamar addProduct con los campos dados
    try {
    const newProduct = productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
    );
    console.log("Nuevo producto agregado:", newProduct);
    }   catch (error) {
        console.error("Error al agregar producto:");
    }

  // Llamar getProducts nuevamente (debería mostrar el producto recién agregado)
    console.log(productManager.getProducts());

  // Intentar agregar un producto con el mismo código (debería arrojar un error)
    try {
    productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
    );
    } catch (error) {
    console.error("Error al agregar producto");
    }

// Probar getProductById 
try {
    const productFound = productManager.getProductById(productManager.getProducts()[0].id);
    console.log("Producto encontrado por ID:", productFound);
        } catch (error) {
        console.error("Error al obtener producto por ID");
}
