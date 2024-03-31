import {getUserByName} from "./services/userService.js";

export default async (req, res, next) => {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const authData = auth.substring(6, auth.length).split(":");
        const user = await getUserByName(authData[0]);
        if(user.name === authData[0] && user.password === authData[1]){
            next();
            return;
        }
    }

    res.status(401).end("Auth header not provided");
}
