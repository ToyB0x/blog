const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  output: 'export',
  transpilePackages: ['ui', 'mdx-lib'],
  experimental: { esmExternals: 'loose' },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
})
