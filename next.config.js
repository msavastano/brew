const dot = require('dotenv').config()
const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  env: {
    TEST_VAR: process.env.TEST_VAR,
    API_BASEURL: process.env.API_BASEURL,
    API_XRAPIDKEY: process.env.API_XRAPIDKEY,
    API_XRAPIDHOST: process.env.API_XRAPIDHOST,
    STATES: process.env.STATES
  },
  cssLoaderOptions: {
    url: false
  }
})