import express from "express";
import {get} from "../services/service.js";
import {addCount, getCount} from "../services/countService.js";
import authMiddleware from "../authMiddleware.js";

export const codeControllerRouter = express.Router();

codeControllerRouter.get('/:code', authMiddleware, (req, res) => {
    const data = get(req.params.code);

    if(!data) {
        res.status(404).send('Invalid code');
    }

    res.redirect(data.url);
    addCount();

    res.end(`count: ${getCount()}`);
});