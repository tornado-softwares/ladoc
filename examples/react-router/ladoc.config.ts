import type { ladoc_configuration } from '@ladoc/core/configuration';

export default {
  languages: {
    directories: {
      default: './src/assets/content',
    },
  },
  markdown: {
    engine: 'mdx-js',
  },
} satisfies ladoc_configuration;
