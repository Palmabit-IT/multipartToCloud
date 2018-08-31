'use strict'

const s3 = require('./clouds/S3/s3')
const cloudinary = require('./clouds/cloudinary/cloudinaryUpload')
const get = require('./getFileFromMultipart')

class MultipartToCloud {
  constructor(configs = {}) {
    this.configs = configs
  }

  s3(req, options) {
    return get(req)
  }
}

module.exports = MultipartToCloud;