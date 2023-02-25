import http from 'http';
import { app } from './app.js'

const PORT = process.env.port || 4000;

const server = http.createServer(app);

server.on('error', () => {
  console.log('http://localhost:' + PORT,  ' failing to connect');
})
server.on('listening', () => {
  console.log('http://localhost:' + PORT);
});
server.listen(PORT);
