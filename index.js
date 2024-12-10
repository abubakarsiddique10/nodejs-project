// dependencies
const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');
const { handleReqRes} = require('./helpers/handleReqRes.js');
const environment = require('./helpers/environments.js');
const data = require('./lib/data.js');


// test
// data.create('test', 'newFile', [{id: 1, name: "abu", age: 20}], function (error) {
//     console.log(error)
// })

// data.read('test', 'newFile', function (err, data) {
//     console.log(data)
//     console.log(err)
// })

// data.upadate('test', 'newFile', { name: "imam", age: 21 }, function (err) {
//     console.log(err)
// })

// data.delete('test', 'newFile', function (err) {
//     console.log(err)
// })


// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log('server is running', environment.port)
    })
}

// heandle request response
app.handleReqRes = handleReqRes
// start the server
app.createServer()











































/* let decoder = new StringDecoder('utf-8')
    console.log(decoder, 'hey') */
    /* req.on('data', (buffer) => {
        console.log(decoder.write(buffer))
    }) */
    
    /* res.write('hello world!');
    res.end(); */

/* const school = new School()
school.on('click', () => {
    console.log('hello')
})
school.startPeriod() */ 
/* 
const server = http.createServer((req, res) => {
    if(req.url === "/") {
        // const readStream = fs.createReadStream(`${__dirname}/demo.txt`, "utf8");
        // const writeStream = fs.createWriteStream(`${__dirname}/demo2.txt`);
        // readStream.on('data', (chunk) => {
        //     writeStream.write(chunk);
        //     res.end();
        // })
        res.write(`
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <form action="/process" method="post">
                <input/>
            </form>
        </body>
        </html>
            `)
        res.end();
    }else if(req.url === "/process" && req.method === "POST"){
        let decoder = new StringDecoder('utf-8');
        let body = '';
        let body2 = [];
        req.on('data', (buffer) => {
            // body2.push(buffer); way 1
            body += decoder.write(buffer);
        })
        req.on('end', () => {
            // way 1
            // const decoded = Buffer.concat(body2).toString();
            // const data = querystring.parse(decoded);
            // res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.write('<h1>Thank you for your submission</h1>');
            // res.write(`<p>${data.message}</p>`);
            // res.end();

            // way 2
            // body += decoder.end();
            // const parsedData = querystring.parse(body);
            // res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.write('<h1>Thank you for your submission</h1>');
            // res.write(`<p>${parsedData.message}</p>`);
            // res.end();
        });
    }else {
        res.write('not found');
    }
})
server.listen(3000)



/* const readStream = fs.createReadStream(`${__dirname}/demo.txt`);
const writeStream = fs.createWriteStream(`${__dirname}/demo2.txt`);
readStream.pipe(writeStream) */


/* readStream.on('data', (chunk) => {
    writeStream.write(chunk)
    console.log()
}) */


// Scaffolding obj
/* const app = {};

app.config = {
    timeb: 1000
}


// don't reassing function prametters

// which is the best code / best practice
const math = {};
math.getNumber = function getNumber(num1, num2) {
    return num1 + num2;
}
const math = {
    getNumber(num1, num2){
        return num1 + num2;
    }
};

module.exports = {math} */