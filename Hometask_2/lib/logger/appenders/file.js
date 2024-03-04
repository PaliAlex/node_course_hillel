import * as fs from "fs";
import moment from "moment";
import {level as levelConstant, messageFormat} from "../constants.js";
import {createObjectCsvWriter} from "csv-writer";

function log(appenderValues) {
    appenderValues.format === messageFormat.CSV
        ? writeToCSV(appenderValues)
        : writeToFile(appenderValues)
}

async function writeToCSV(data) {
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

function writeToFile(appenderValues) {
    const { format, level } = appenderValues;

    const formattedMessage = formatMessage(appenderValues);

    writeFileCommon(`app_${format.toLowerCase()}.log`, formattedMessage, format);

    level === levelConstant.ERROR && writeFileCommon(`error_${format.toLowerCase()}.log`, formattedMessage)
}

function formatMessage(appenderValues) {
    const {date, level, category, message, format} = appenderValues;

    return format === messageFormat.JSON
        ?  JSON.stringify(appenderValues)
        : `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`
}

function writeFileCommon(filePath, message) {
    fs.writeFile(
        filePath,
        `\n${message}`,
        {flag: 'a+'},
        err => err && console.error(err)
    )
}

export default {log};
