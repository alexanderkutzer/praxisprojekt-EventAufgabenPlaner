export const authTokenMiddleware = (userService) => async (req, res, next) => {
    //here coms a string with Bearer and the token so we split it and take only the token
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
        return res.status(401).send({ error: "No token provided" });
    }

    const user = await userService.getUserByToken(token);
    if (!user) {
        return res.status(401).send({ error: "Invalid token" });
    }

    req.user = user;
    next();
};

export const authTokenIsAdminMiddleware = (userService) => async (req, res, next) => {
    //here coms a string with Bearer and the token so we split it and take only the token
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
        return res.status(401).send({ error: "No token provided" });
    }

    const user = await userService.getUserByToken(token);
    if (!user) {
        return res.status(401).send({ error: "Invalid token" });
    }

    if (!user.isAdmin) {
        return res.status(401).send({ error: "User is not an admin" });
    }

    req.user = user;
    next();
};
