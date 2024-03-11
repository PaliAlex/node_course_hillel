import * as net from "net";
import config from "../config.js";

let client;

export function initNetworkAppender(appenderValue) {
    const {date, category, level, message} = appenderValue
    const data = `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`;

    client = net.connect({port:config.port}, ()=>{
        console.log("Connected");
    });


    client.write(data);
    process.on("exit", ()=>{
        console.log('exit')
    })
}