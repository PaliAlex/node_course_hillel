import {messageFormat} from "../constants.js";
import config from "../config.js";

export function formatMessage(chunk) {
    const appenderValues = JSON.parse(chunk);

    const {date, level, category, message} = appenderValues;

    if(config.format === messageFormat.CSV) {
        return `\n${date}, ${category}, ${level}, ${JSON.stringify(message)}`
    }

    const formattedMessage =  config.format === messageFormat.JSON
        ? JSON.stringify(appenderValues)
        : `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`;

    return `\n${formattedMessage}`
}