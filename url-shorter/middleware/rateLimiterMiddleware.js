import {checkLimit} from "../services/rateLimeterServise.js";
import {getDataById} from "../services/dataService.js";


export default async function rateLimiterMiddleware(req, res, next) {
    const code = req.params.code;
    const data = getDataById(code);

    await checkLimit(res, data.userId.toString(), 1000, 86400000);
    await checkLimit(res, data.code.toString(), 100, 3600000);

    next();
}

