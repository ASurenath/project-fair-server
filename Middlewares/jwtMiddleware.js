const jwt = require('jsonwebtoken')
const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwt middleware");
    try {
        const token = req.headers["authorization"].split(" ")[1]
        console.log(token);
        if (token) {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.payload = jwtResponse.userId
            next()
        }
        else {
            res.status(401).json("Please provide token")
        }
    }
    catch {
        res.status(401).json("Access denied")
    }
}

module.exports = jwtMiddleware