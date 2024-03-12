import express from "express"
import {get, add} from "./services/service.js"
import authMiddleware, {users} from "./authMiddleware.js"
import generateHash from "../Hometask_1/utils.js"
import {codeControllerRouter} from "./controller/codeController.js";
import {userControllerRouter} from "./controller/userController.js";

const app = express();

app.use('/code', codeControllerRouter);
app.use('/create', userControllerRouter);

app.post('/add',
    authMiddleware,
    express.json(),
    (req, res) => {

    const code = generateHash(5);
    const addedData = {
        ...req.body,
        visits: 0,
        code,
        created_time: Date.now(),
        user: users.name
    }

    add(code,addedData);

    res.json(addedData);

    res.end();
});

app.get('/info/:code', authMiddleware, express.json(),(req, res) => {
    const data = get(req.params.code);

    res.json(data);
});


app.listen(3001, () => {
    console.log("Server Started");
})


