import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {},
  entry: ['src/**/index.ts', '!src/**/lib/**/index.ts'],
  fixedExtension: false,
  format: 'esm',
  clean: true,
  dts: {
    sourcemap: false,
  },
});
