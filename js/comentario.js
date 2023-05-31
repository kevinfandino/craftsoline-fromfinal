// Obtener el botón de "Comprar producto" por su ID
const comprarBtn = document.getElementById('comprar-producto');

// Agregar un manejador de eventos de clic al botón
comprarBtn.addEventListener('click', () => {
  // Construir la URL de la página del producto utilizando su ID
  const productoID = '12345'; // Reemplazar con el ID del producto real
  const productoURL = `https://tiendavirtual.com/productos/${productoID}`;

  // Redireccionar al usuario a la página del producto
  window.location.href = productoURL;
});




function guardarComentario() {
  // Obtener el valor del campo de texto
  var comentario = document.getElementById("comentario").value;

  // Crear un objeto con los datos del comentario
  var nuevoComentario = {
    list_comments: comentario,
    comment_date: new Date().toISOString()
  };

  // Realizar una solicitud POST a la API para guardar el comentario
  fetch("http://localhost:8080/api/v1/comments", {
    method: "POST",
    body: JSON.stringify(nuevoComentario),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      // Agregar el comentario a la lista de comentarios en la página
      var listaComentarios = document.getElementById("lista-comentarios");
      var nuevoElemento = document.createElement("li");
      nuevoElemento.innerText = data.list_comments;
      listaComentarios.appendChild(nuevoElemento);

      // Limpiar el campo de texto después de guardar el comentario
      document.getElementById("comentario").value = "";
    })
    .catch(error => console.error(error));
}

function mostrarComentario() {
  const commentList = document.getElementById("comment-list");

  fetch("http://localhost:8080/api/v1/comments", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((comments) => {
      comments.forEach((comment) => {
        const li = document.createElement("li");
        
        const commentText = document.createElement("span");
        commentText.textContent = comment.message;
        li.appendChild(commentText);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
          eliminarComentario(comment.id);
          li.remove();
        });

        li.appendChild(deleteButton);
        commentList.appendChild(li);
      });
    })
    .catch((error) => console.error(error));
}

function eliminarComentario(commentId) {
  // Hacer una solicitud de eliminación al servidor utilizando el commentId
  // Por ejemplo, puedes utilizar fetch con el método DELETE:
  fetch(`http://localhost:8080/api/v1/comments/${commentId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // Realizar cualquier acción adicional después de eliminar el comentario
    })
    .catch((error) => console.error(error));
}
  