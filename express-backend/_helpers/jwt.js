/**
 * JSON Web Token middleware checks if token received from http request is valid
 * before allowing access to API (returns "401 Unauthorized" if not valid).
 *
 * Used on all routes except public access routes.
 */

const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../features/users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
