const fs = require('fs');
const http = require('http');
const path = require('path');
const eventos = require('events');
const { registrarLog } = require('./log'); 

const eventEmitter = new eventos();

eventEmitter.on('fileRead', (filename) => {
    console.log(`📖 El archivo "${filename}" fue leído exitosamente.`);
    registrarLog(`El archivo "${filename}" fue leído exitosamente.`);
});

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Bienvenido al sistema de archivos.');

    } else if (req.url === '/leer') {
        const filePath = path.join(__dirname, 'archivo.txt');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                registrarLog(`Error al leer el archivo: ${err.message}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al leer el archivo');
                return;
            }
            eventEmitter.emit('fileRead', 'archivo.txt');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

    } else if (req.url === '/escribir') {
        const filePath = path.join(__dirname, 'archivo.txt');
        const contenido = 'Este es un nuevo contenido para el archivo.\n';
        fs.writeFile(filePath, contenido, (err) => {
            if (err) {
                registrarLog(`Error al escribir el archivo: ${err.message}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al escribir en el archivo');
                return;
            }
            registrarLog('Archivo escrito exitosamente.');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Archivo escrito exitosamente');
        });

    } else if (req.url === '/editar') {
        const filePath = path.join(__dirname, 'archivo.txt');
        const nuevoContenido = 'Este es el contenido editado del archivo.\n';
        fs.appendFile(filePath, nuevoContenido, (err) => {
            if (err) {
                registrarLog(`Error al editar el archivo: ${err.message}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al editar el archivo');
                return;
            }
            registrarLog('Archivo editado exitosamente.');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Archivo editado exitosamente');
        });

    } else if (req.url === '/eliminar') {
        const filePath = path.join(__dirname, 'archivo.txt');
        fs.unlink(filePath, (err) => {
            if (err) {
                registrarLog(`Error al eliminar el archivo: ${err.message}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al eliminar el archivo');
                return;
            }
            registrarLog('Archivo eliminado exitosamente.');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Archivo eliminado exitosamente');
        });

    } else {
        registrarLog(`Ruta no encontrada: ${req.url}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

server.listen(3000, () => {
    console.log('✅ Servidor corriendo en http://localhost:3000');
    registrarLog('Servidor iniciado en el puerto 3000');
});
