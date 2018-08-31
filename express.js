'use strict'

var app = require('express')();

const MultipartToCloud = require('./index')
const multipartToCloud = new MultipartToCloud()

app.post('/', function mainHandler(req, res) {
  multipartToCloud.s3(req)
    .then(() => {
      res.send('ok')
    })
    .catch(err => {
      res.status(500).send(err.toString())
    })
});
app.listen(3000);