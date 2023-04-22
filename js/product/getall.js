const endpoint = "http://localhost:9090/api/v1/product";

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
        <td>${product.product_id}</td>
        <td>${product.product_name}</td>
        <td>${product.product_ean_code}</td>
        <td>${product.product_brand}</td>
        <td>${product.product_description}</td>
        <td>${product.product_inventory}</td>
        <td>${product.product_price}</td>
        <td>
          <a href="edit.html?id=${product.product_id}" class="btn btn-warning btn-block my-1">
          <i class="bi bi-pen-fill text-white"></i>
          </a>
          <button onclick="removeProduct(${product.product_id})" class="btn btn-danger btn-block">
          <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

loadProducts();

removeProduct = async (id) => {
  try {
    const response = await fetch(`${endpoint}?id=${id}`, {
      method: "DELETE",
    });
    console.log(response);
    window.location.reload();
  } catch (error) {

    // Si hay error, muestra el mensaje de error
    mesage.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show my-4" role="alert">
        <strong>¡Error!</strong> ${error}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>  
    `;
    console.error(error);
  }
};
