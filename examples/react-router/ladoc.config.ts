import type { partial_ladoc_configuration } from '@ladoc/core/configuration';

export default {
  languages: {
    default: 'en',
  },
  directories: {
    default: './src/assets/content/default',
  },
  markdown: {
    engine: 'marked',
    plugins: {
      syntax_highlighting: true,
      latex: true,
    },
  },
} satisfies partial_ladoc_configuration;
