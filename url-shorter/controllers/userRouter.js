import express from "express";
import {createUser, getUsersPublicData} from "../services/userService.js";

export const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    const users = getUsersPublicData();

    res.render('users', { users, csrfToken: req.session.csrfToken });
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
    (req, res) => {
        const users = getUsersPublicData();

        res.json(users);
        res.render("users", {users});
    }
)
