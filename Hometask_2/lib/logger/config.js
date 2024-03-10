import * as constants from "./constants.js";
import * as fs from "fs";
import {level, appender as appenderValues} from "./constants.js";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: [constants.appender.CONSOLE],
    format: [constants.messageFormat.DEFAULT]
}

function initConfig() {
    const config = defaultConfig;

    config.logLevel = getLogLevel()
    config.appender = getAppenders()
    config.format = getFormat()

    enrichConfig(config);
    return config;
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function getConfiguration() {
    const file = fs.readFileSync(process.env.LOG_CONFIG_FILE, 'utf-8');
    return JSON.parse(file);
}

function getLogLevel() {
    const confObject = getConfiguration();

    if (!process.env.LOG_LEVEL) {
        return confObject['logLevel'].toUpperCase() || defaultConfig['logLevel'];
    }

    return process.env.LOG_LEVEL;
}

function getFormat() {
    const confObject = getConfiguration();

    if (!process.env.FORMAT) {
        return confObject['format'].toUpperCase() || defaultConfig['format'];
    }

    return process.env.FORMAT;
}

function getAppenders() {
    const confObject = getConfiguration();

    const appenderArray = [];

    confObject['appender'].forEach(
        value => (
            appenderArray.push(appenderValues[value.toUpperCase()])
        )
    )

    if (!process.env.LOG_APPENDER) {
        return appenderArray || defaultConfig['appender'];
    }

    return [process.env.LOG_APPENDER];
}

const config = initConfig();
export default config;




