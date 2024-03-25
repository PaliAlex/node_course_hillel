import express from "express";
import {addCount} from "../services/countService.js";
import {getDataById} from "../services/dataService.js";
import rateLimiterMiddleware from "../middleware/rateLimiterMiddleware.js";

export const codeRouter = express.Router();

codeRouter.get(
    '/code/:code',
    rateLimiterMiddleware,
    async (req, res) => {
        const data = getDataById(req.params.code);

        if(!data) {
            res.status(404).send('Invalid code');
        }

        res.redirect(data.url);
        addCount();

        res.end(data);
    }
);