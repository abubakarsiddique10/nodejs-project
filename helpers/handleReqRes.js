// dependencies
const url = require('url');
const querystring = require('querystring');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes.js');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler.js');
const { parseJSON } = require('./utilities.js')
// handle object - module scaffolding
const handler = {};
// heandle request response
handler.handleReqRes = (req, res) => {
    // break the url in object
    const pathParsed = url.parse(req.url, true);
    // get the pathName
    const pathName = pathParsed.pathname;
    const trimPath = pathName.replace(/^\/+|\/+$/g, '');
    // get the user request method
    let method = req.method.toLowerCase();
    // for post method
    method = "post"
    // method = "put"
    // method = "delete"
    // get the query string
    const queryString = pathParsed.query;
    // get the headers
    const headers = req.headers;

    const person = {
        firstName: "Abu",
        lastName: "Bakar",
        phone: "01610961138",
        password: "123456",
        tosAgreement: true,
    }
    const convertJson = JSON.stringify(person);
    const data = parseJSON(convertJson);

    const requestPropertise = {
        pathParsed,
        pathName,
        method,
        queryString,
        headers,
        data,
    };
    const chosenPath = routes[trimPath] ? routes[trimPath] : notFoundHandler;

    if (req.url === "/") {
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <form method="post" action="/process">
                <input name="message"/>
            </form>
        </body>
        </html>
            `)
        res.end();
    } else if (req.url === pathName) {
        // decode data utf-8  
        let decoder = new StringDecoder('utf-8');
        let realData = '';
        req.on('data', (buffer) => {
            // on function return bainary / buffer data:6d 65 73 73 61 67
            // decoder return encoded data: speriores+aliquam+facere+fuga+in+deleniti
            realData += decoder.write(buffer);
        })
        req.on('end', () => {
            realData += decoder.end();
            // convrt real data: Asperiores aliquam facere fuga in deleniti excepturi saepe
            const parsedData = querystring.parse(realData);
            chosenPath(requestPropertise, (statusCode, payload) => {
                const code = typeof statusCode === 'Number' ? statusCode : 800;
                const data = typeof payload === 'object' ? payload : {};
                //res.writeHead(code)
                //res.setHeader('Content-Type', 'application/json');
                res.write('<h1>Thank you for your submission</h1>');
                res.write(`${JSON.stringify(data)}`);
                res.end();

            })

            /*   res.write('<h1>Thank you for your submission</h1>');
              res.write(`<p>${parsedData.message}</p>`);
              res.end(); */
        });
    } else {
        res.write('not found');
    }
}

module.exports = handler
