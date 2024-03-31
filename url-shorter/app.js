import express from "express"
import logger from "my-logger";
import {codeRouter} from "./controllers/codeRouter.js";
import {userRouter} from "./controllers/userRouter.js";
import {dataRouter} from "./controllers/dataRouter.js";
import {loginRouter} from "./controllers/loginController.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import {generateString} from "./utils/generateString.js";
import {createClient} from "redis";
import RedisStore from "connect-redis";

const log = logger.getLogger("app.js");

// Initialize client.
export let redisClient = createClient({
    url: "redis://@127.0.0.1:6379",
});

redisClient.connect().catch(console.error);


redisClient.set("MyTest", "VALUEEE shoto tam");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    store: new RedisStore({
        client: redisClient, ttl: 86400
    }),
    secret: "QWESdfisdfj3",
    saveUninitialized: true,
    resave: true,
    name: "sessionId",
    cookie: {
        httpOnly: true,
        domain: "127.0.0.1",
    }
}));

app.use('/users', userRouter);
app.use('/', dataRouter);
app.use('/', codeRouter);
app.use('/login', loginRouter);

app.use((req, res, next) => {
    if (req.session.login) {
        return next();
    }

    console.log('ryyyr');
    res.status(401).send("Unauthorized");
});

app.use((req, res, next) => {
    if (!req.session.csrfToken) {
        req.session.csrfToken = generateString(16);
    }

    next();
})



app.set('view engine', 'ejs');
app.use(express.static("views"));

app.listen(3001, () => {
    log.info("Server Started");
})


