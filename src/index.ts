import { WebSocketServer } from 'ws';

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (msg) => {
        console.log('Received:', msg.toString());
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server started on ws://localhost:${PORT}`);