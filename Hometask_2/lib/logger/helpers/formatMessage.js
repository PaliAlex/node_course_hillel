import {messageFormat} from "../constants.js";

export function formatMessage(chunk) {
    const appenderValues = JSON.parse(chunk);

    const {date, level, category, message, format} = appenderValues;

    const formattedMessage =  format === messageFormat.JSON
        ? JSON.stringify(appenderValues)
        : `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`;

    return `\n${formattedMessage}`
}