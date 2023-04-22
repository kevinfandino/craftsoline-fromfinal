
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const ean = form.elements.ean.value;
  const name = form.elements.name.value;
  const description = form.elements.description.value;
  const brand = form.elements.brand.value;
  const photo = form.elements.photo.files[0];
  const units = form.elements.units.value;
  
  // Validar que se han llenado los campos
  if (!ean || !name || !description || !brand || !photo || !units) {
    alert('Por favor, complete todos los campos');
    return;
  }
  
  // Validar que la foto es una imagen
  if (!photo.type.startsWith('image/')) {
    alert('Por favor, seleccione un archivo de imagen');
    return;
  }
  
  // Validar que el número de unidades es un número positivo
  if (isNaN(units) || units < 0) {
    alert('Por favor, ingrese un número de unidades válido');
    return;
  }
  
  // Crear un objeto con los datos del producto
  const product = {
    ean,
    name,
    description,
    brand,
    photo,
    units
  };
  
  // Enviar el objeto a un servidor o guardarlo localmente, etc.
  // Por ejemplo, aquí lo mostramos en la consola
  console.log(product);
  
  // Limpiar el formulario para crear un nuevo producto
  form.reset();
});

const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'nombre_de_usuario',
  host: 'localhost',
  database: 'nombre_de_la_base_de_datos',
  password: 'contraseña',
  port: 5432,
});

// Manejador del evento submit del formulario
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const ean = form.elements.ean.value;
  // ... código para obtener los otros valores del formulario ...
  
  // Crear un objeto con los datos del producto
  const product = {
    ean,
    name,
    description,
    brand,
    photo,
    units
  };
  
  try {
    // Insertar el objeto en la tabla "products" de la base de datos
    const result = await pool.query(
      'INSERT INTO products (ean, name, description, brand, photo, units) VALUES ($1, $2, $3, $4, $5, $6)',
      [ean, name, description, brand, photo, units]
    );
    console.log('Producto creado:', result.rows[0]);
    
    // Limpiar el formulario para crear un nuevo producto
    form.reset();
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
});


