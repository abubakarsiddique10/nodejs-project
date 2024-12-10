// dependencies
const data = require('../../lib/data.js');
const { hash, parseJSON } = require('../../helpers/utilities.js');

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
/* handler._token.get = function (requestPropertise, callBack) {
} */

handler._token.post = function (requestPropertise, callBack) {
    const phone = typeof (requestPropertise.data.phone) === "string" && requestPropertise.data.phone.trim().length === 11 ? requestPropertise.data.phone : false;

    const password = typeof (requestPropertise.data.password) === "string" && requestPropertise.data.password.trim().length > 0 ? requestPropertise.data.password : false;

    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            console.log(userData)
        })
    } else {
        callBack(400, {
            error: "You have a problem in your request"
        })
    }

}
/* 
handler._token.put = function (requestPropertise, callBack) {

}

handler._token.delete = function (requestPropertise, callBack) {

} */

module.exports = handler;