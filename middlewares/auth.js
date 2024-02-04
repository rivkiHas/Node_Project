import Jwt from "jsonwebtoken"

export const auth = (req, res, next) => {

    let token = req.headers["x-access-token"]
    if (!token)
        return res.status(401).json({ type: "not authorized", message: " missing token " })
    try {
        let user = Jwt.verify(token, process.env.SECRET_JWT);
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ type: "not authorized", message: " invalid token / token is not in " })
    }
}


export const authAdmin = (req, res, next) => {

    let token = req.headers["x-access-token"]
    if (!token)
        return res.status(401).json({ type: "not authorized", message: " missing token " })
    try {
        let user = Jwt.verify(token, process.env.SECRET_JWT);
        if (user.role != "ADMIN")
            res.status(403).json({ type: "not allowed", message: "this operation only to mrneger" })

        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ type: "not authorized", message: " invalid token / token is not in " })
    }
}
