const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    const location = JSON.parse(message);
    console.log(`Ubicación recibida: Latitud: ${location.lat}, Longitud: ${location.lng}`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor WebSocket escuchando en ws://localhost:8080');
