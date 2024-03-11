import * as net from "net";

export const logsCache = [];

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const log = data.toString();
        console.log('Received log:', log);
        logsCache.push(log);
    });

    socket.write(JSON.stringify(logsCache));

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(7000, 'localhost', () => {
    console.log('Socket server running');
});
