import type { Config } from '@react-router/dev/config';
import { get_static_paths } from '@ladoc/server';

export default {
  appDirectory: './src/app',
  ssr: true,
  prerender: {
    paths: async (args) => {
      console.log(args.getStaticPaths());
      const ladoc_paths = await get_static_paths();
      const documentation_i18n = ladoc_paths.map((page) => '/' + page.language + '/' + 'documentation' + page.path);
      const documentation_no_i18n = ladoc_paths.map((page) => '/' + 'documentation' + page.path);
      console.log(documentation_i18n);
      console.log(documentation_no_i18n);
      return [...documentation_i18n, ...documentation_no_i18n];
    },
    concurrency: 10,
  },
} satisfies Config;
