import * as constants from "./constants.js";
import * as fs from "fs";
import {level, appender as appenderValues} from "./constants.js";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function getFileValue(value, constantValues, filePath) {
    if(!filePath) {
        return null;
    }

    const file = fs.readFileSync(filePath, 'utf-8');
    const confObject = JSON.parse(file);

    const configValue = confObject[value].toUpperCase();

    return constantValues[configValue];
}

function getConfigurationValue(envValue, constantValues, valueName) {
    const fileValue = getFileValue(valueName, constantValues, process.env.LOG_CONFIG_FILE);

    if (!envValue) {
        return fileValue || defaultConfig[valueName];
    }

    return envValue.toUpperCase();
}

function initConfig() {
    const config = defaultConfig;

    const logLevel = getConfigurationValue(
        process.env.LOG_LEVEL,
        level,
        'logLevel'
    );

    const appender = getConfigurationValue(
        process.env.LOG_APPENDER,
        appenderValues,
        'appender'
    );

    config.logLevel = logLevel
    config.appender = appender

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
