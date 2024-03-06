import config from "./config.js";
import {level, messageFormat, appender, level as levelConstant} from "./constants.js";
import {consoleLogEvent} from "./appenders/console.js";
import {fileLogEvent} from "./appenders/file.js";
import {joinMessages} from "./helpers/joinMessages.js";
import {LoggerStream} from "./streams/LoggerStream.js";

const logger = (category, format) => {
    return ({
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
};

function executeLog(level, category, messages, format) {
    const appenderValues = {
        date: Date.now(),
        level,
        category,
        message: joinMessages(messages),
        format,
    }

    emitEvent(appenderValues);
}

function emitEvent(appenderValues) {
    const logger = new LoggerStream();

    config.appender.forEach(it => {
        switch (it) {
            case appender.CONSOLE:
                consoleLogEvent.emit('log', appenderValues, logger.consoleLogStream())
                return;
            case appender.FILE:
                fileLogEvent.emit('log', appenderValues, logger.fileLogStream(appenderValues))
                return;

            default: return;
        }
    })
}

export default {
    getLogger(category, format= messageFormat.DEFAULT) {
        return logger(category, format);
    }
};
