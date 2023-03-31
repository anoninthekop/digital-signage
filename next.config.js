//const withCSS = require('@zeit/next-css')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  excludeDefaultMomentLocales: false
}

module.exports = nextConfig

/** 
withCSS({
  cssLoaderOptions: {
    url: false
  }
})
*/