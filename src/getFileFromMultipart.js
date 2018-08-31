'use strict';

const multiparty = require('multiparty');

/**
 * Helper method which takes the request object and returns a promise with a file.
 */
const getFileFromRequest = (req) => new Promise((resolve, reject) => {
  const form = new multiparty.Form();

  form.on('part', part => {

    if (part.filename) {
      console.log('got file named ' + part.name + ' filename ' + part.filename);
    }
    part.resume();
  })

  form.on('error', error => reject(error))

  form.on('close', () => resolve())

  form.parse(req)

});

module.exports = getFileFromRequest;
