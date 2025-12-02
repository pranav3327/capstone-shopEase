const net = require('net');

const HOST = 'interchange.proxy.rlwy.net';
const PORT = 50666;

console.log(`Connecting to ${HOST}:${PORT}...`);

const socket = new net.Socket();

socket.connect(PORT, HOST, () => {
  console.log(`Connected via TCP to ${socket.remoteAddress}!`);
  console.log('Waiting for server greeting (MySQL sends this immediately)...');
});

socket.on('data', (data) => {
  console.log('Received data!');
  console.log('Hex:', data.toString('hex'));
  console.log('Text:', data.toString('utf8').replace(/[^\x20-\x7E]/g, '.'));
  socket.destroy();
});

socket.on('close', () => {
  console.log('Connection closed');
});

socket.on('error', (err) => {
  console.error('Connection error:', err.message);
});

// Timeout after 5 seconds
setTimeout(() => {
  console.log('Timeout: No data received after 5s.');
  if (!socket.destroyed) {
    console.log('This strongly suggests it is NOT MySQL (or it is blocked).');
    socket.destroy();
  }
}, 5000);
