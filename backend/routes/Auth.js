const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("authorization");

    // Fixing the split to correctly get the token part
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Authentication Token Required!" });
    }

    jwt.verify(token, "tcmTM", (err, user) => {
        if (err) {
            return res.status(403).json({ msg: "Token is not valid!" });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
