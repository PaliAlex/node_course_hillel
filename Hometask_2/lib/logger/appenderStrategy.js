import * as constants from "./constants.js";
import config from "./config.js";
import consoleAppender from "./appenders/console.js"
import fileAppender from "./appenders/file.js"

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
};

function getAppender(){
    return config.appender.map(it => appenders[it]);
}

export {getAppender}
