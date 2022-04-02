const withTM = require('next-transpile-modules')(['ui'])
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer(
  withTM({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,
  })
)
