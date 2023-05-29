const withTM = require('next-transpile-modules')(['ui', 'mdx-lib'])
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer(
  withTM({
    experimental: { esmExternals: 'loose' },
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,
    swcMinify: true,
  })
)
