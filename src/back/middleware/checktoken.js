const jwt = require('jsonwebtoken');
const dotenv= require('dotenv').config();

const secretKey= process.env.SECRET_KEY;
// check jwt token
const checkToken = (req, res, next) => {

    if(req.originalUrl === '/auth') {
        next();
        return;
    }

    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, 'juxdtjcghtcrgtxrht', (err, authData) => {
            if(err) {
                res.status(403).json({ error: "token invalide" });
            } else {
                // next middleware
                next();
            }
        });

    } else {
        // forbidden
        res.status(401).json({ error: "token manquant" });
    }
}

module.exports = checkToken;