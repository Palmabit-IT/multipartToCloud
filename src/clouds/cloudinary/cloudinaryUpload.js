/* eslint-disable camelcase */
'use strict';

const cloudinary = require('cloudinary');

const {
  CLOUDINARY_CLOUD_NAME: cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
} = process.env;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const {v2} = cloudinary;
const {uploader} = v2;

const upload = (file = {}) => {
  const {path} = file;
  return new Promise((resolve, reject) => {
    if (!path) reject();
    else uploader.upload(path, (error, success) => {
      if (error) {
        reject(error);
      }      else resolve(success);
    });
  });
};

const destroy = id => {
  return new Promise((resolve, reject) => {
    uploader.destroy(id, {invalidate: true}, (error, success) => {
      if (error) {
        return reject(error);
      }
      resolve(success);
    });
  });
};

module.exports = {destroy, upload};
