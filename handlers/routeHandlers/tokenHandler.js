// dependencies
const data = require('../../lib/data.js');
const { hash, parseJSON, createRandomString } = require('../../helpers/utilities.js');

const handler = {};
handler.tokenHandler = (requestPropertise, callBack) => {

    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestPropertise.method) > -1) {
        handler._token[requestPropertise.method](requestPropertise, callBack);
    } else {
        callBack(405, {
            error: 'not allowd method'
        })
    }
}

handler._token = {};
handler._token.get = function (requestPropertise, callBack) {
    const token = '5fa6fvjk3mcuoqqbfrocp';
    const id = typeof (token) === "string" && token.trim().length == 21 ? token : false;

    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            if (!err && token) {
                const token = JSON.parse(tokenData)
                callBack(200, token)
            } else {
                callBack(404, {
                    error: 'Requested token was not fount'
                })
            }
        })
    } else {
        callBack(404, {
            error: 'Requested token was not fount'
        })
    }
}


handler._token.post = function (requestPropertise, callBack) {
    const phone = typeof (requestPropertise.data.phone) === "string" && requestPropertise.data.phone.trim().length === 11 ? requestPropertise.data.phone : false;

    const password = typeof (requestPropertise.data.password) === "string" && requestPropertise.data.password.trim().length > 0 ? requestPropertise.data.password : false;

    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            let hashPassword = hash(password);
            ;

            if (hashPassword === parseJSON(userData).password) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    tokenId,
                    expires,
                }

                // store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callBack(200, tokenObject)
                    } else {
                        callBack(500, {
                            error: 'There was a problem in the server side'
                        })
                    }
                })
            } else {
                callBack(400, {
                    error: "Password is not valid"
                })
            }

        })
    } else {
        callBack(400, {
            error: "You have a problem in your request"
        })
    }

}

handler._token.put = function (requestPropertise, callBack) {
    const token = 'x2wtdbnqo3y8rzm8c7ips';
    const extendValue = true;

    const id = typeof (token) === "string" && token.trim().length == 21 ? token : false;

    const extend = typeof (extendValue) === "boolean" && extendValue === true ? true : false;

    if (id && extend) {
        data.read('tokens', id, (err1, tokenData) => {
            let tokenObject = parseJSON(tokenData)
            if (tokenObject.expires >= Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;
                // store the updated token
                data.upadate('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callBack(200)
                    } else {
                        callBack(400, {
                            error: 'There was a server side error'
                        })
                    }
                })
            } else {
                callBack(404, {
                    error: 'Token already expired!'
                })
            }
        })
    } else {
        callBack(404, {
            error: 'There was a problem in your request'
        })
    }


}

handler._token.delete = function (requestPropertise, callBack) {
    const token = 'hvfxvsi5f7apmpjehdue8';

    const id = typeof (token) === "string" && token.trim().length == 21 ? token : false;

    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            if (!err && tokenData) {
                data.delete('tokens', id, (err1) => {
                    if (!err1) {
                        callBack(200, {
                            message: "token was successfully deleted"
                        })
                    } else {
                        callBack(500, {
                            error: 'There was a server side error'
                        })
                    }
                })
            } else {
                callBack(400, {
                    error: 'There was a problem in your request'
                })
            }
        })
    }
}
handler._token.verufy = function (id, phone, callBack) {
    data.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            const tokenObject = parseJSON(tokenData);
            if (tokenObject.phone === phone && tokenObject.expires >= Date.now()) {
                callBack(true)
            } else {
                callBack(false)
            }
        } else {
            callBack(false)
        }
    })
}

module.exports = handler;