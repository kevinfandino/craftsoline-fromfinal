const endpoint = "http://localhost:8080/api/v1/product";

const mesage = document.querySelector("#mesage");

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
        <td>${product.product_inventory}</td>
        <td>${product.product_price}</td>
        <a href="purchase.html?id=${product.product_id}" class="btn btn-warning btn-block my-1">
          <i class="bi bi-pen-fill text-white"></i>
          </a>  
        `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

loadProducts();


