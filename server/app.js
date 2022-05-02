const express = require('express');
const fs = require('fs');
const csvToJson = require('csvtojson');

const app = express();
app.set('json spaces', 2);

app.get('/', (req, res) => {
    let agent = req.header('user-agent').replace(/,/g,'');
    let time = new Date().toISOString();
    let method = req.method;
    let resource = req.originalUrl; 
    let version = `HTTP/${req.httpVersion}`;
    let status = res.statusCode;

    let data = `${agent},${time},${method},${resource},${version},${status}`
    console.log(data);

    fs.appendFile("./server/log.csv", `\n${data}`, (err) => {
        if (err) {
            console.log(err);
        }
    })
    res.status(200).send("ok");
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
csvToJson()
.fromFile("./server/log.csv")
.then((jsonObj) => {
    res.json(jsonObj);
})

});
module.exports = app;