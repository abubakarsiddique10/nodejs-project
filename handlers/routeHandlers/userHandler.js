// dependencies
const data = require('../../lib/data.js');
const { hash, parseJSON } = require('../../helpers/utilities.js');
const tokenHandler = require('./tokenHandler.js')


const handler = {};
handler.userHandler = (requestPropertise, callBack) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestPropertise.method) > -1) {
        handler._users[requestPropertise.method](requestPropertise, callBack);
    } else {
        callBack(405, {
            error: 'not allowd method'
        })
    }
}

handler._users = {};
handler._users.get = function (requestPropertise, callBack) {
    const queryString = '01610961138';
    const phone = typeof (queryString) === "string" && queryString.trim().length === 11 ? queryString : false;

    if (phone) {
        const token = 'h1foxif8kmzauko2l1xci'
        tokenHandler._token.verufy(token, phone, (tokenId) => {
            if (tokenId) {
                data.read('users', phone, (err, user) => {
                    if (!err && user) {
                        const parseJson = JSON.parse(user)
                        delete parseJson.password
                        callBack(200, parseJson)
                    } else {
                        callBack(404, {
                            error: 'Requested user was not fount'
                        })
                    }
                })
            } else {
                callBack(403, {
                    error: 'Authentication failed'
                })
            }
        })
    } else {
        callBack(404, {
            error: 'Requested user was not fount'
        })
    }


}

handler._users.post = function (requestPropertise, callBack) {

    const firstName = typeof (requestPropertise.data.firstName) === "string" && requestPropertise.data.firstName.trim().length > 0 ? requestPropertise.data.firstName : false;

    const lastName = typeof (requestPropertise.data.lastName) === "string" && requestPropertise.data.lastName.trim().length > 0 ? requestPropertise.data.lastName : false;

    const phone = typeof (requestPropertise.data.phone) === "string" && requestPropertise.data.phone.trim().length === 11 ? requestPropertise.data.phone : false;

    const password = typeof (requestPropertise.data.password) === "string" && requestPropertise.data.password.trim().length > 0 ? requestPropertise.data.password : false;

    const tosAgreement = typeof (requestPropertise.data.tosAgreement) === "boolean" ? requestPropertise.data.tosAgreement : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        data.read('users', phone, (err, user) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                }
                data.create('users', phone, userObject, (err1) => {
                    if (!err1) {
                        callBack(200, {
                            message: 'User was created successfully'
                        })
                    } else {
                        callBack(500, {
                            error: 'could not create user'
                        })
                    }
                })
            } else {
                callBack(500, {
                    error: "There was a problem in server side"
                })
            }
        })
    } else {
        callBack(400, {
            error: "You have a problem in your request"
        })
    }
}

handler._users.put = function (requestPropertise, callBack) {
    const firstName = typeof (requestPropertise.data.firstName) === "string" && requestPropertise.data.firstName.trim().length > 0 ? requestPropertise.data.firstName : false;

    const lastName = typeof (requestPropertise.data.lastName) === "string" && requestPropertise.data.lastName.trim().length > 0 ? requestPropertise.data.lastName : false;

    const phone = typeof (requestPropertise.data.phone) === "string" && requestPropertise.data.phone.trim().length === 11 ? requestPropertise.data.phone : false;

    const password = typeof (requestPropertise.data.password) === "string" && requestPropertise.data.password.trim().length > 0 ? requestPropertise.data.password : false;

    if (phone) {
        if (firstName || lastName || password) {
            data.read('users', phone, (err2, userData) => {
                if (!err2 && userData) {
                    const parseJson = parseJSON(userData)
                    if (firstName) {
                        parseJson.firstName = firstName
                    }
                    if (lastName) {
                        parseJson.lastName = lastName
                    }
                    if (password) {
                        parseJson.password = password
                    }
                    data.upadate('users', phone, parseJson, (err3) => {
                        if (!err3) {
                            callBack(200, {
                                error: 'updated data successfully'
                            })
                        } else {
                            callBack(404, {
                                error: 'not updated data'
                            })
                        }
                    })
                } else {
                    callBack(400, {
                        error: "You have a problem in your request"
                    })
                }
            })
        } else {
            callBack(400, {
                error: "You have a problem in your request"
            })
        }
    } else {
        callBack(400, {
            error: "Invalid phone number."
        })
    }

}

handler._users.delete = function (requestPropertise, callBack) {
    const phone = typeof (requestPropertise.data.phone) === "string" && requestPropertise.data.phone.trim().length === 11 ? requestPropertise.data.phone : false;

    if (phone) {
        data.read('users', phone, (err, userData) => {
            if (!err && userData) {
                data.delete('users', phone, (err1) => {
                    if (!err1) {
                        callBack(200, {
                            message: "user was successfully deleted"
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

module.exports = handler;