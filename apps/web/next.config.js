const withMDX = require('@next/mdx')()
const withTM = require('next-transpile-modules')(['ui'])

module.exports = withMDX(
  withTM({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,
  })
)
