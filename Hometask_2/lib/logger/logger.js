import config from "./config.js";
import {level} from "./constants.js";
import {logEvent} from "./appenders/log.js";
import {joinMessages} from "./helpers/joinMessages.js";
import {LoggerStream} from "./streams/LoggerStream.js";

const logger = (category, format) => {
    return ({
        info: (...messages) => {
            executeLog(level.INFO, category, messages)
        },
        warn: (...messages) => {
            executeLog(level.WARN, category, messages)
        },
        error: (...messages) => {
            executeLog(level.ERROR, category, messages)
        }
    });
};

function executeLog(level, category, messages) {
    const appenderValues = {
        date: Date.now(),
        level,
        category,
        message: joinMessages(messages),
    }

    const logger = new LoggerStream();

    emitEvent(appenderValues);
}

function emitEvent(appenderValues) {
    const logger = new LoggerStream();

    config.appender.forEach(it => {
        logEvent.emit('log', appenderValues, logger.fileLogStream(appenderValues, it))
    })
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
