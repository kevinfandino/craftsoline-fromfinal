const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
			break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
			break;
		case "password2":
			validarPassword2();
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

// Importar la librería de hash (crypto-js)
// Asegúrate de incluir el archivo de la librería en tu proyecto
// Puedes obtenerlo desde https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js

// ...

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    // Encriptar las contraseñas utilizando SHA-256
    const encryptedPassword1 = CryptoJS.SHA256(inputPassword1.value).toString();
    const encryptedPassword2 = CryptoJS.SHA256(inputPassword2.value).toString();

    if (encryptedPassword1 !== encryptedPassword2) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).textContent = 'Las contraseñas no coinciden';
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).textContent = '';
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}


});

var checkbox = document.getElementById("termino")
var banderacontrol = false

checkbox.addEventListener("click", function (e) {
	console.log(e.target);
	console.log(checkbox.checked);
	var terminos = document.getElementById("terminos")
	if (!banderacontrol) {
		terminos.classList = "show"
		banderacontrol = true
	}
	else {
		terminos.remove("show")
		banderacontrol = false
	}
})

document.getElementById('formulario').addEventListener('submit', function(event) {
	event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
	// Obtén los valores de los campos del formulario
	var username = document.getElementById('usuario').value;
	var name = document.getElementById('nombre').value;
	var email = document.getElementById('correo').value;
	var phone = document.getElementById('telefono').value;
	var password = document.getElementById('password').value;
  
	// Crea un objeto con los datos a enviar a la API
	var userData = {
	  user_name: username,
	  first_name: name,
	  user_email: email,
	  phone_number: phone,
	  password: password
	};
  
	// Realiza una solicitud POST a la API para guardar los datos en la base de datos
	fetch('http://localhost:8080/api/v1/user', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(userData)
	})
	.then(function(response) {
	  if (response.ok) {
		// Los datos se guardaron correctamente en la base de datos
		alert('Los datos se guardaron correctamente en la base de datos');
	  } else {
		// Hubo un error al guardar los datos en la base de datos
		alert('Hubo un error al guardar los datos en la base de datos');
	  }
	})
	.catch(function(error) {
	  // Hubo un error en la solicitud a la API
	  alert('Hubo un error en la solicitud a la API');
	  console.error(error);
	});
  });
  