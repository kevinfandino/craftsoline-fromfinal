const form = document.getElementById("product-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const requestData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:8080/api/v1/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      message.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show my-4" role="alert">
          <strong>¡Éxito!</strong> Producto agregado correctamente. 
          <small class="text-muted fs-5">Redireccionando...</small>
          <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      `;

      // Limpia el formulario
      form.reset();

      // Después de 3 segundos, redirecciona a la página de productos
      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/craftsoline-fromfinal/product/index.html";
      }, 3000);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    message.innerText = "Error al agregar producto";
    message.classList.remove("text-success");
    message.classList.add("text-danger");
  }
});
