import * as fs from "fs";
import {level as levelConstant} from "../constants.js";

function log(date, level, category, message) {
    console.log(formatMessage(date, level, category, message));
}

function formatMessage(date,level, category, message) {
    const formattedMessage = `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`

    level === levelConstant.ERROR
        ? writeToFile('app_error.log', formattedMessage)
        : writeToFile('app.log', formattedMessage)

    return formattedMessage;
}


function checkFileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true; // File exists
    } catch (err) {
        return false; // File does not exist
    }
}

function writeToFile(filePath, message) {
    const messageToFile = checkFileExists(filePath) ? `\n${message}` : message;

    fs.writeFileSync(filePath, messageToFile, {flag: 'a+'})
}
export default {log};
