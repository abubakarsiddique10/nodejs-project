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
// create random string
utilities.createRandomString = function (stringLength) {
    let length = stringLength;
    length = typeof (stringLength) === 'number' && stringLength > 0 ? stringLength : false;
    if (length) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz123456789';
        let outPut = '';
        for (let i = 0; i <= length; i++) {
            const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            outPut += randomCharacter;
        }
        return outPut
    }
}


module.exports = utilities