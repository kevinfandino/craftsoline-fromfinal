const form = document.getElementById("product-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const requestData = Object.fromEntries(formData.entries());
  const file = formData.get('imagen');

  try {
    // Subir la imagen a S3
    if (file) {
      AWS.config.update({
        region: 'América del Sur (São Paulo) sa-east-1', // Reemplaza con la región de tu bucket en S3
        credentials: new AWS.Credentials('TU_ACCESS_KEY_ID', 'TU_SECRET_ACCESS_KEY') // Reemplaza con tus propias credenciales de AWS
      });

      var fileName = file.name;
      var albumName = 'kafandino89'; // Reemplaza con el nombre de tu bucket en S3

      var albumPhotosKey = encodeURIComponent(albumName) + '/';

      var photoKey = albumPhotosKey + fileName;

      var upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'kafandino89', // Reemplaza con el nombre de tu bucket en S3
          Key: photoKey,
          Body: file,
          ACL: 'public-read'
        }
      });

      var promise = upload.promise();

      await promise; // Esperar a que se complete la carga antes de continuar
      requestData.imagenUrl = upload.httpRequest.endpoint.href + albumName + '/' + fileName;
    }

    // Enviar los datos del formulario al servidor
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
