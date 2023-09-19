const socketClient = io();

//elementos
const productsList = document.getElementById("productsList");
const createProductForm = document.getElementById("createProductForm");

//Enviamos informacion del formulario al socket del servidor
createProductForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const jsonData = {};
    for (const [key, value] of formData.entries()){
        jsonData[key] = value
    };
    jsonData.price = parseInt(jsonData.price);
    jsonData.stock = parseInt(jsonData.stock);
    //Enviamos el objeto de informacion del producto al socket del servidor
    socketClient.emit("addProduct", jsonData);
    createProductForm.reset();
});


//Recepcion de productos
socketClient.on("productsArray", (dataProducts)=>{
    let productsElements = "";
    dataProducts.forEach(product => {
        productsElements +=
        `<li>
            <p>Nombre: ${product.title}</p> <button onclick="deleteProduct(${product.id})"> Eliminar producto </button>
        </li> `
    });
    productsList.innerHTML = productsElements;
});


//Borrado de productos
let deleteProduct = (productId) =>{
    socketClient.emit("deleteProduct", productId)
}
