const fs = require('fs');
const http = require('http');
const path = require('path');
const eventos = require('events');

/* creamos una nueva instacia de evento */
const eventEmitter = new eventos();


//Servidor HTTP
const server = http.createServer((req, res) => {

    // Ruta raíz 
    if(req.url === '/') {
       
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Bienvenido al sistema de archivos.');

    }else if (req.url === '/leer') {

        // Lee el archivo y envia su contenido como respuesta
        const filePath = path.join(__dirname, 'archivo.txt');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al leer el archivo');
                return;
            };

            // Envia el contenido del archivo como respuesta http
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data); 

        });
    }
    
    else {

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');

    }

});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');

});
