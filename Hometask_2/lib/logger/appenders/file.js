import EventEmitter from "node:events";
import {messageFormat} from "../constants.js";

export const fileLogEvent = new EventEmitter();

fileLogEvent.on('log',  (appenderValues, stream) => {
    log(appenderValues, stream);
});

function log(appenderValues, stream) {
    appenderValues.format === messageFormat.CSV
        ? writeToCSV(appenderValues, stream)
        : writeToFile(appenderValues, stream)

    stream.destroy();
}

function writeToCSV(appenderValues, stream) {
    stream.write({
        date: appenderValues.date,
        category: appenderValues.category,
        level: appenderValues.level,
        message: JSON.stringify(appenderValues.message),
    });
}


function writeToFile(appenderValues, stream) {
    stream.push(JSON.stringify(appenderValues));
}
