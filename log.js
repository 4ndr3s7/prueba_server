const fs = require('fs');
const path = require('path');

// Agrega contenido al archivo log.txt
function agregarContenido(req, res) {
    const filePath = path.join(__dirname, 'log.txt');
    const contenido = 'Nueva línea agregada con appendFile.\n';
    fs.appendFile(filePath, contenido, (err) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al agregar contenido');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contenido agregado exitosamente');
    });
}

// Elimina el archivo log.txt
function borrarArchivo(req, res) {
    const filePath = path.join(__dirname, 'log.txt');
    fs.unlink(filePath, (err) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al borrar el archivo');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Archivo borrado exitosamente');
    });
}

function registrarLog(mensaje) {
    const filePath = path.join(__dirname, 'log.txt');
    const fecha = new Date().toLocaleString();
    const linea = `[${fecha}] ${mensaje}\n`;
    
    fs.appendFile(filePath, linea, (err) => {
        if (err) {
            console.error('❌ Error al escribir en el log:', err);
        }
    });
}

module.exports = {
    agregarContenido,
    borrarArchivo,
    registrarLog
};
