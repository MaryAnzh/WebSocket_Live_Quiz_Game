import { WebSocketServer } from 'ws';
import { connectionRegistry, routeMessage } from './server/index';

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (msg) => {
        routeMessage(ws, msg.toString());
    });

    ws.on('close', () => {
        connectionRegistry.removeBySocket(ws);
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server started on ws://localhost:${PORT}`);