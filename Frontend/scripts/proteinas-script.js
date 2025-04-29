import { proteinas } from "../productsData/proteinas.js";

let html = '';

proteinas.forEach((product, index) => {
    const webHtml = `<div class="content-item" id="product-container-${index}">
                <img src="${product.image}" alt="protein-img">
                <div class="description">
                    <h2>${product.name}</h2>
                    <div class="rating">
                        <img src="./Imagenes/5stars.png" alt="Rating">
                        <p>${product.rating}</p>
                    </div>
                    <div class="buy">
                        <p>Comprar</p>
                        <div class="buy-links">
                            <a href="${product.amzLink}" target="_blank"><img src="./Imagenes/amz-logo.png" alt="amzLink"></a>
                            <a href="${product.gncLink}" target="_blank"><img src="./Imagenes/GNC-Logo.png" alt="gncLink" ></a>
                        </div>
                    </div>
                    <p class="avg-price">Precio promedio <span class="price">$${product.precio}</span></p>
                    <button class="agregar-lista" data-index="${index}">Agregar a Mi Lista</button>
                </div>
            </div>`;

    html += webHtml;
});

const content = document.querySelector(".content");
content.innerHTML = html;

const buttons = document.querySelectorAll(".agregar-lista");
buttons.forEach(button => {
    button.addEventListener("click", async (event) => {
        const index = event.target.getAttribute("data-index");
        const selectedProduct = proteinas[index];

        try {
            if (button.innerHTML === "Eliminar de Mi Lista") {
                // Obtener los productos actuales para encontrar el _id
                const response = await fetch("http://localhost:3001/api/products");
                const products = await response.json();

                // Buscar el producto en la base de datos por nombre (o mejor aún, por otro dato si fuera posible)
                const productToDelete = products.find(prod => prod.name === selectedProduct.name);

                if (!productToDelete) {
                    alert("Producto no encontrado en la base de datos.");
                    return;
                }

                // Ahora sí hacemos la petición DELETE
                const deleteResponse = await fetch(`http://localhost:3001/api/products/${productToDelete._id}`, {
                    method: "DELETE",
                });

                if (deleteResponse.ok) {
                    alert(`Producto ${selectedProduct.name} eliminado de Mi Lista.`);
                    button.textContent = "Agregar a Mi Lista";
                } else {
                    alert(`Error al eliminar el producto: ${deleteResponse.statusText}`);
                }

                return; // Salimos de la función aquí para no seguir con el POST
            }

            // Código para agregar el producto (si no era para eliminar)
            const addResponse = await fetch("http://localhost:3001/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: selectedProduct.name,
                    precio: selectedProduct.precio,
                    image: selectedProduct.image,
                    rating: selectedProduct.rating,
                    amzLink: selectedProduct.amzLink,
                    gncLink: selectedProduct.gncLink
                }),
            });

            if (addResponse.ok) {
                alert(`Producto ${selectedProduct.name} agregado a Mi Lista.`);
                button.textContent = "Eliminar de Mi Lista";
            } else {
                alert(`Error al agregar el producto: ${addResponse.statusText}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error al conectar con el servidor.");
        }
    });
});
