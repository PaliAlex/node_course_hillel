import * as fs from "fs";
import moment from "moment";
import EventEmitter from "node:events";
import {messageFormat} from "../constants.js";
import {createObjectCsvWriter} from "csv-writer";

export const fileLogEvent = new EventEmitter();

fileLogEvent.on('log',  (appenderValues, stream) => {
    log(appenderValues, stream);
});

function log(appenderValues, stream) {
    appenderValues.format === messageFormat.CSV
        ? writeToCSV(appenderValues, stream)
        : writeToFile(appenderValues, stream)
}

function writeToCSV(appenderValues, stream) {
    stream.write({
        date: appenderValues.date,
        category: appenderValues.category,
        level: appenderValues.level,
        message: JSON.stringify(appenderValues.message),
    });
}

async function writeToCSV2(data) {
    const fileName = `${moment(data.date).format('DD_MM_YYYY')}.csv`;
    const exists = fs.existsSync(fileName);

    const dataToWrite = {
        ...data,
        message: JSON.stringify(data.message)
    }

    const csvWriter = createObjectCsvWriter({
        path: fileName,
        header: [
            { id: 'date', title: 'Date' },
            { id: 'category', title: 'Category' },
            { id: 'level', title: 'Level' },
            { id: 'message', title: 'Message' }
        ],
        append: exists,
    });

    await csvWriter.writeRecords([dataToWrite])
}

function writeToFile(appenderValues, stream) {
    stream.push(JSON.stringify(appenderValues));
}
