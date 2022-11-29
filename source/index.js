const { format, parseISO } = require('date-fns');
const express = require('express');
const moment = require('moment/moment');
const nunjucks = require('nunjucks')
var app = express();
// const 
const pdf_generate = require('./index3');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', pdf_generate);
const date = "2022-11-23T02:30:00.647Z";
// console.log(moment(new Date(date)).format("MM-dd-yy"));
// const date = "2021-12-20"
console.log(format(parseISO(date), "dd-MM-yyyy"));
app.listen(5000, () => console.log("server started"))