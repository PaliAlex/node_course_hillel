import express from "express";
import {createUser, getUsersPublicData} from "../services/userService.js";

export const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    const users = getUsersPublicData();

    res.render('users', { users });
})

userRouter.post(
    '/create',
    express.json(),
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
