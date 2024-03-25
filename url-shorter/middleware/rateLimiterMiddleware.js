import {isLimitExceeded} from "../services/rateLimeterServise.js";
import {getDataById} from "../services/dataService.js";
import {redisClient} from "../app.js";

const defaultData = {
    amount: 1,
    date: Date.now(),
};

export default async function rateLimiterMiddleware(req, res, next) {
    const code = req.params.code;
    const data = getDataById(code);

    await checkLimit(res, data.userId.toString(), 1000, 86400000);
    await checkLimit(res, data.code.toString(), 100, 3600000);

    next();
}

export async function checkLimit(res, value, limit, timePeriod) {
    const isExists = await redisClient.exists(value);

    if(isExists) {
        const isExceeded = await isLimitExceeded(value, limit, timePeriod);

        isExceeded && res.status(429).send('Amount exceeded');
    }

    else {
        redisClient.set(value, JSON.stringify(defaultData));
    }
}

