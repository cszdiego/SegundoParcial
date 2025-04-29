import { creatinas } from "../productsData/creatinas.js";

let html = '';

creatinas.forEach((product, index) => {
    const webHtml = `<div class="content-item" id="product-container-${index}">
                <img src="${product.image}" alt="creatina-img">
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
                            <a href="${product.gncLink}" target="_blank"><img src="./Imagenes/GNC-Logo.png" alt="gncLink"></a>
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
        const selectedProduct = creatinas[index];

        try {
            if (button.innerHTML === "Eliminar de Mi Lista") {
                const response = await fetch(`http://localhost:3001/api/products/${selectedProduct._id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert(`Producto ${selectedProduct.name} eliminado de Mi Lista.`);
                    button.textContent = "Agregar a Mi Lista";
                } else {
                    alert("Error al eliminar el producto.");
                }
                return;
            }

            const response = await fetch("http://localhost:3001/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedProduct),
            });

            if (response.ok) {
                alert(`Producto ${selectedProduct.name} agregado a Mi Lista.`);
                button.textContent = "Eliminar de Mi Lista";
            } else {
                alert(`Error al agregar: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error al conectar con el servidor.");
        }
    });
});
