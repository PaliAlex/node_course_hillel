import {redisClient} from "../app.js";

export async function isLimitExceeded(value, limit, timePeriod) {
    const data = await redisClient.get(value);

    const parsedData = JSON.parse(data);

    if(parsedData.amount > limit && !hasTimePeriodPassed(parsedData.date, timePeriod)) {
        return true;
    }

    redisClient.set(value, JSON.stringify({
        ...parsedData,
        amount: parsedData.amount + 1
    }));

    return false;
}


function hasTimePeriodPassed(date, period) {
    const currentDate = Date.now();

    return currentDate - date > period;
}


