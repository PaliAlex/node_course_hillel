export const getAuthUserName = (req) => {
    const auth = req.header("Authorization");

    if (auth?.startsWith("Basic ")) {
        const authData = auth.substring(6, auth.length).split(":");

        return authData[0]
    }
}