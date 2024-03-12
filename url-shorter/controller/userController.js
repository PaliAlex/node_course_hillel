import express from "express";
import {addUser} from "../services/userService.js";

export const userControllerRouter = express.Router();

userControllerRouter.post(
    '/',
    express.json(),
    (req, res) => {
        const user = req.body;

        addUser(user.name, user);

        res.json(user)
    }
);