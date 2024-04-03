import express from "express";
import authMiddleware from "../authMiddleware.js";
import {getAuthUserName} from "../utils/getAuthUserName.js";
import {addData, getAllData, getDataById} from "../services/dataService.js";

export const dataRouter = express.Router();

dataRouter.use('/url-shorter', async (req, res) => {
    req.headers.authorization = 'Basic John:qwerty';
    const userName = getAuthUserName(req);

    const data = await getAllData(userName);

    res.render('url-shorter',  {data});
})

dataRouter.post('/add',
    authMiddleware,
    express.json(),
    (req, res) => {
        const userName = getAuthUserName(req);
        const data = addData(req.body,userName);

        res.json(data);
        res.end();
    }
);


dataRouter.get('/info/:code', authMiddleware, express.json(),(req, res) => {
    const data = getDataById(req.params.code);

    res.json(data);
});