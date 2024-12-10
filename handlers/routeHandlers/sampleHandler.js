


const handler = {};
handler.sampleHandler = (requestPropertise, callBack) => {
    callBack(200, {
        message: "This sampleHandler"
    })
}


module.exports = handler;