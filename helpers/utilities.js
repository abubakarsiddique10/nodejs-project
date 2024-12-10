// dependencies
const crypto = require('crypto');

// module scaffolding
const utilities = {};

// parse to json string
utilities.parseJSON = function (jsonString) {
    let output;
    try {
        output = JSON.parse(jsonString)
    } catch (error) {
        output = {}
    }
    return output
}

// hashing password
utilities.hash = function (string) {
    if (typeof (string) === "string" && string.length > 0) {
        const hash = crypto
            .createHmac('sha256', 'hello')
            .update(string)
            .digest('hex');
        return hash
    } else {
        return false
    }
}


module.exports = utilities