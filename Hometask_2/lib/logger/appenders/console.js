import * as fs from "fs";
import {level as levelConstant} from "../constants.js";

function log(date, level, category, message) {
    console.log(formatMessage(date, level, category, message));
}

function formatMessage(date,level, category, message) {
    const formattedMessage = `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`

    writeToFile('app.log', formattedMessage)

    level === levelConstant.ERROR && writeToFile('app_error.log', formattedMessage)

    return formattedMessage;
}

function writeToFile(filePath, message) {
    const messageToFile = fs.existsSync(filePath) ? `\n${message}` : message;

    fs.writeFileSync(filePath, messageToFile, {flag: 'a+'})
}
export default {log};
