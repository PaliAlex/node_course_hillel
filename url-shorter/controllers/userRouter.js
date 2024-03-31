import express from "express";
import {createUser, getUsersPublicData, getUser} from "../services/userService.js";

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const users = await getUsersPublicData();

    res.render('users', { users, csrfToken: req.session.csrfToken });
});

userRouter.get('/:userId', async (req, res) => {
    const user = await getUser(req.params.userId);

    res.json(user);
})

userRouter.post(
    '/create',
    express.json(),
    (req, res, next) => {
        if (req.session.csrfToken !== req.body.csrfToken) {
            return res.status(403);
        }
        next();
    },
    (req, res) => {
        const user = req.body;

        createUser(user);

        res.json(user)
    }
);

userRouter.get(
    "/all",
    // authMiddleware,
    express.json(),
    async (req, res) => {
        const users = await getUsersPublicData();

        res.json(users);
        res.render("users", {users});
    }
)
