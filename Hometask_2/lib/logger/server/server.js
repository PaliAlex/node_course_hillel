import * as http from "http";
import * as net from "net";

export const server = http.createServer((req, res) => {
    console.log('connection established');
    let dataBuffer = '';

    if(req.method === "GET" && req.url === "/logs") {
        const netClient = net.connect({ port: 7000 }, () => {
            netClient.on('data', data => {
                dataBuffer += data.toString();
            });

            netClient.on('end', () => {
                console.log('Disconnected from TCP server');
            });
        });

        res.write(JSON.stringify(dataBuffer))
        res.statusCode = 200
    }else{
        res.statusCode = 404;
    }

    res.end()
})

server.listen(8000, () => {
    console.log('server started');
})