const { jwtVerify } = require('jose');
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        req.user = payload.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}
module.exports = fetchuser;
