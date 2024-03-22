import express from "express";
import {checkPassword} from "../services/userService.js";

export const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.render('login', {errorMessage: ''});
})

loginRouter.post("/", (req, res) => {
    const {login, password} = req.body;

    if (checkPassword(login, password)) {
        req.session.login = login;
        res.redirect(302, "/users");
    } else {
        res.render("login", {errorMessage: "Unauthorized"});
    }
});
