import * as net from "net";
import http from "http";

const logsCache = [];

const httpserver = http.createServer((req, res) => {
    if (req.url === '/logs' && req.method === 'GET') {
        res.end(JSON.stringify(logsCache));
        res.statusCode = 200
    } else {
        res.statusCode = 404
        res.end('Not found\n');
    }
});

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const log = data.toString();
        console.log('Received log:', log);
        logsCache.push(log);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});


httpserver.listen(8000, () => {
    console.log('http server started');
})

server.listen(7000, 'localhost', () => {
    console.log('Socket server running');
});
