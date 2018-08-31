'use strict';

const AWS = require('aws-sdk');
const { join, extname } = require('path');
const { readFileSync } = require('fs');
// const credentials = require('./credentials');
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

const DEFAULT_EXPIRES = 60 * 60 * 24 * 7; // 7 days

class S3 {
  constructor({ Bucket = AWS_S3_BUCKET, Expires = DEFAULT_EXPIRES }) {
    this.s3 = new AWS.S3(credentials);
    this.params = {
      Bucket,
      Expires,
    };
  }

  upload(file, options = {}) {
    const { key } = options;

    if (!key) return Promise.reject('Missing key');

    return new Promise((resolve, reject) => {
      const buffer = readFileSync(file.path);
      const extension = extname(file.path);
      return this.s3.upload({
        Bucket: AWS_S3_BUCKET,
        ACL: 'private',
        Key: join(key),
        Body: buffer,
      }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

}

module.exports = S3;

