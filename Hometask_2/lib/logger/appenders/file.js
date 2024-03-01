function log(appenderValues) {
    const {date, level, category, message} = appenderValues;

    console.log(`Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`);
}

export default {log};
