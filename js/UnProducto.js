async function getProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    try {
      const product = await fetch(
        `http://localhost:8080/api/v1/product/${productId}`
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
      console.log("error ", error);
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
  const mesage = document.getElementById("muestra_producto");
  