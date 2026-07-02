import type { partial_ladoc_configuration } from '@ladoc/core/configuration';

export default {
  languages: {
    default: 'en',
  },
  directories: {
    default: './src/assets/content/default',
    fr: './src/assets/content/fr',
  },
  markdown: {
    engine: 'ladoc',
  },
} satisfies partial_ladoc_configuration;
