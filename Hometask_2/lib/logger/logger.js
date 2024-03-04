import config from "./config.js";
import {scoreLevel, level, messageFormat} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js"

const logger = (category, format) => ({
    info: (...messages) => {
        executeLog(level.INFO, category, messages, format)
    },
    warn: (...messages) => {
        executeLog(level.WARN, category, messages, format)
    },
    error: (...messages) => {
        executeLog(level.ERROR, category, messages, format)
    }
});

function joinMessages(messages) {
    const array = [];

    messages.forEach(it => array.push(JSON.stringify(it)));

    return array.join(',');
}

const appenders = appenderStrategy.getAppenders();

function executeLog(level, category, messages, format) {
    const appenderValues = {
        date: Date.now(),
        level,
        category,
        messages: joinMessages(messages),
        format
    }

    if (scoreLevel[level] <= config.scoreLevel) {
        appenders.forEach(
            appender => {
                appender.log(appenderValues)
            }
        );
    }
}

export default {
    getLogger(category, format= messageFormat.DEFAULT) {
        return logger(category, format);
    }
};
