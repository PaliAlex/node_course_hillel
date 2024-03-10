import EventEmitter from "node:events";

export const logEvent = new EventEmitter();

logEvent.on('log',  (appenderValues, stream) => {
    log(appenderValues, stream);
});

function log(appenderValues, stream) {
    stream.push(JSON.stringify(appenderValues));

    stream.destroy();
}
