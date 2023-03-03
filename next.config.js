//const withCSS = require('@zeit/next-css')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  infrastructureLogging : { 
    level: 'log' 
  }
}

module.exports = nextConfig

/** 
withCSS({
  cssLoaderOptions: {
    url: false
  }
})
*/