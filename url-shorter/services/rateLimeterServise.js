import {redisClient} from "../app.js";

const defaultData = {
    amount: 1,
    date: Date.now(),
};

export async function checkLimit(res, value, limit, timePeriod) {
    const isExists = await redisClient.exists(value);

    if(isExists) {
        await checkRequestLimit(res, value, limit, timePeriod);
    }
    else {
        redisClient.set(value, JSON.stringify(defaultData));
    }
}

async function checkRequestLimit(res, value, limit, timePeriod) {
    const data = await redisClient.get(value.toString());

    const parsedData = JSON.parse(data);

    if(parsedData.amount > limit && !hasTimePeriodPassed(parsedData.date, timePeriod)) {
        res.status(429).send('Amount exceeded');
    } else {
        redisClient.set(value.toString(), JSON.stringify({
            ...parsedData,
            amount: parsedData.amount + 1
        }));
    }
}


function hasTimePeriodPassed(date, period) {
    const currentDate = Date.now();

    return currentDate - date > period;
}


