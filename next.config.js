//const withCSS = require('@zeit/next-css')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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