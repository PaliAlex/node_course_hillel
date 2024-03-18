import express from "express"
import {codeRouter} from "./controllers/codeRouter.js";
import {userRouter} from "./controllers/userRouter.js";
import {dataRouter} from "./controllers/dataRouter.js";

const app = express();

app.use('/', dataRouter);
app.use('/', codeRouter);
app.use('/users', userRouter);

app.set('view engine', 'ejs');
app.use(express.static("views"));

app.listen(3001, () => {
    console.log("Server Started");
})


