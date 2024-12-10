// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler.js');
const { userHandler } = require('./handlers/routeHandlers/userHandler.js');
const { tokenHandler } = require('./handlers/routeHandlers/tokenHandler.js');
console.log('HI')
const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
}

module.exports = routes 