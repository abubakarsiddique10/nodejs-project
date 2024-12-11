// dependencies
const data = require('../../lib/data.js');
const { hash, parseJSON } = require('../../helpers/utilities.js');
const tokenHandler = require('./tokenHandler.js')


const handler = {};
handler.checkHandler = (requestPropertise, callBack) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestPropertise.method) > -1) {
        handler._check[requestPropertise.method](requestPropertise, callBack);
    } else {
        callBack(405, {
            error: 'not allowd method'
        })
    }
}

handler._check = {};
handler._check.get = function (requestPropertise, callBack) {

}

handler._check.post = function (requestPropertise, callBack) {


}

handler._check.put = function (requestPropertise, callBack) {


}

handler._check.delete = function (requestPropertise, callBack) {

}

module.exports = handler;