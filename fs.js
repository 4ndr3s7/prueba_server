const fs = require('fs');


// CRUD 



// Create - Crear un archivo
fs.writeFile('archivo.txt', 'Inicio...', (err) => {
  if (err) throw err;
  console.log('El archivo ha sido creado');
});


// Read - Leer un archivo
fs.readFile('archivo.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Contenido del archivo:', data);
});




 
// Update - Actualizar un archivo
fs.appendFile('archivo.txt', '\nContenido adicional', (err) => {
  if (err) throw err;
  console.log('El archivo ha sido actualizado');
});



/*

// Delete - Eliminar un archivo
fs.unlink('archivo.txt', (err) => {
  if (err) throw err;
  console.log('El archivo ha sido eliminado');
});
*/

// Verificar si un archivo existe

