

const handler = {};
handler.notFoundHandler = (requestPropertise, callBack) => {
    callBack(404, {
        message: "not found"
    })
}


module.exports = handler;