import { bcaas } from "../productsData/bcaa.js";

let html = '';

bcaas.forEach((product)=>{
    const webHtml = `<div class="content-item">
                <img src="${product.image}" alt="creatine-img">
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
                    <button class="agregar-lista">Agregar a Mi Lista</button>
                </div>
            
            </div>`

    html += webHtml;
})

const content = document.querySelector(".content");
content.innerHTML = html;