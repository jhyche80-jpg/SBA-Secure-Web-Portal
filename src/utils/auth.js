const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const { data } = jwt.verify(token, secret);
        req.user = data.user; // attach user to request
        next(); // important! continue to route
    } catch (err) {
        console.log('Invalid Token', err.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;