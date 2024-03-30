import * as constants from "./constants.js";
import * as fs from "fs";
import {level, appender as appenderValues} from "./constants.js";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: [constants.appender.CONSOLE],
    format: [constants.messageFormat.DEFAULT],
    port: 3000,
    hostname: 'hostname'
}

function initConfig() {
    const config = defaultConfig;

    config.logLevel = getConfigurationValue('logLevel', process.env.LOG_LEVEL);
    config.appender = getAppenders();

    config.format = getConfigurationValue('format', process.env.FORMAT);
    config.port = Number(getConfigurationValue('port', process.env.PORT));
    config.hostname = getConfigurationValue('hostname', process.env.HOSTNAME);

    enrichConfig(config);
    return config;
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function getConfiguration() {
    const filePath = process.env.LOG_CONFIG_FILE || '/Users/sashko/WebstormProjects/node_course_hillel/my-logger/logger.json'
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
}

function getConfigurationValue(value, envVariable) {
    const confObject = getConfiguration();

    if (!envVariable) {
        return confObject[value].toString().toUpperCase() || defaultConfig[value];
    }

    return envVariable;
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




