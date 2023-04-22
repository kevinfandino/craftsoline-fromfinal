async function getProductData() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  try {
    const product = await fetch(
      `http://localhost:9090/api/v1/product/${productId}`
    );
    const productData = await product.json();

    // Esto siginicaria que el producto no existe y no se puede editar
    if (productData.status) {
      document.getElementById("error").textContent =
        "Error Product not found !";
      // el form debe estar deshabilitado
      disabledform();
    } else {
      // If the product exists, fill the form with the data
      document.getElementById("ean").value = productData.product_ean_code;
      document.getElementById("name").value = productData.product_name;
      document.getElementById("description").value =
        productData.product_description;
      document.getElementById("brand").value = productData.product_brand;
      document.getElementById("units").value = productData.product_inventory;
      document.getElementById("price").value = productData.product_price;
    }
  } catch (error) {
    // If the product doesn't exist, show an error message
    document.getElementById("error").textContent = "Error: Product not found";
    // el form debe estar deshabilitado
    disabledform();
  }
}

getProductData();

const disabledform = () => {
  document.getElementById("ean").disabled = true;
  document.getElementById("name").disabled = true;
  document.getElementById("description").disabled = true;
  document.getElementById("brand").disabled = true;
  document.getElementById("units").disabled = true;
  document.getElementById("price").disabled = true;
  document.getElementById("btnedit").disabled = true;
};

const formEdit = document.getElementById("product-form");
const mesage = document.getElementById("mesage");

formEdit.addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const ean = document.getElementById("ean").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const units = document.getElementById("units").value;
  const price = document.getElementById("price").value;

  const product = {
    product_ean_code: ean,
    product_name: name,
    product_description: description,
    product_brand: brand,
    product_inventory: units,
    product_price: price,
  };

  try {
    const response = await fetch(
      `http://localhost:9090/api/v1/product/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status) {
      mesage.innerHTML = `<div class="alert alert-danger" role="alert">
      Product action failed
    </div>`;
    } else {
      mesage.innerHTML = `<div class="alert alert-success" role="alert">
      Product updated successfully
    </div>`;
    }
  } catch (error) {
    mesage.innerHTML = `<div class="alert alert-danger" role="alert">
    ${data.message}
  </div>`;
  }
});
