let html = '';

async function cargarProductosDesdeBD() {
    try {
        const response = await fetch("http://localhost:3001/api/products");
        const productos = await response.json();

        if (!response.ok || productos.length === 0) {
            document.querySelector(".content").innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        productos.forEach((product) => {
            const webHtml = `<div class="content-item" id="product-${product._id}">
                    <img src="${product.image}" alt="preWorkout-img">
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
                        <button class="eliminar-lista agregar-lista" data-id="${product._id}">Eliminar de Mi Lista</button>
                    </div>
                </div>`;

            html += webHtml;
        });

        document.querySelector(".content").innerHTML = html;

        // Agregar evento a cada botón de eliminar
        const deleteButtons = document.querySelectorAll(".eliminar-lista");
        deleteButtons.forEach(button => {
            button.addEventListener("click", async () => {
                const productId = button.getAttribute("data-id");

                try {
                    const deleteResponse = await fetch(`http://localhost:3001/api/products/${productId}`, {
                        method: "DELETE"
                    });

                    if (deleteResponse.ok) {
                        alert("Producto eliminado correctamente.");
                        // Remover el producto del DOM
                        const container = document.getElementById(`product-${productId}`);
                        if (container) container.remove();
                    } else {
                        alert("Error al eliminar el producto.");
                    }
                } catch (error) {
                    console.error("Error al eliminar producto:", error);
                    alert("Error al conectar con el servidor.");
                }
            });
        });

    } catch (error) {
        console.error("Error al cargar productos desde la base de datos:", error);
        document.querySelector(".content").innerHTML = "<p>Error al cargar productos.</p>";
    }
}

cargarProductosDesdeBD();
