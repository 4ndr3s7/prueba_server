const http = require('http');
const math = require('./math');
const { stringify } = require('querystring');

result = math.add(5, 3);


const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola mundo desde el servidor con node js\n'); 
});

server.listen(3000, () => {
  console.log('Server runinig at  http://localhost:3000');
}); 

