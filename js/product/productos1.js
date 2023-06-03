const endpoint = "http://localhost:8080/api/v1/product";
const carritoBody = document.getElementById("carrito-body");
const totalPriceElement = document.getElementById("total-price");

const carrito = [];

async function loadProducts() {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.length === 0) {
      mesage.innerHTML = `
      <div class="alert alert-primary alert-dismissible fade show my-4" role="alert">
        <strong>¡Atención!</strong> No hay productos registrados.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `;
    }

    const tbody = document.querySelector("tbody");
    data.forEach((product) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${product.product_name}</td>
        <td>${product.product_brand}</td>
        <td>${product.product_description}</td>
        <td>${product.product_price}</td> 
        <td>
          <input type="number" id="product2-quantity" min="1" value="1">
          <button class="add-to-cart-button" data-product-id="${product.product_id}" onclick="addToCart(${product.product_id}, ${product.product_price})">Agregar al carrito</button>
        </td>
        `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

function addToCart(productId, productPrice) {
  const quantityInput = document.getElementById("product2-quantity");
  const quantity = quantityInput.value;
  const product = {
    id: productId,
    price: productPrice,
    quantity: quantity
  };
  carrito.push(product);
  updateCart();
}

function updateCart() {
  carritoBody.innerHTML = "";
  let totalPrice = 0;

  carrito.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${product.id}</td>
      <td>${product.price}</td>
    `;
    carritoBody.appendChild(tr);

    totalPrice += product.price * product.quantity;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function checkout() {
  const confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = "Redireccionando...";
  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5500/craftsoline-fromfinal/principal.html"; // Reemplaza con la URL de tu página principal
  }, 3000);
}


loadProducts();
