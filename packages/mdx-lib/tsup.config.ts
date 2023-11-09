import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  target: 'es2021',
  dts: { resolve: true },
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // dual package の場合
  minify: true,
  sourcemap: true,
})
