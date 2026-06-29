import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: './src/app',
  ssr: true,
  prerender(args) {
    console.log(args.getStaticPaths());
    return [];
  },
} satisfies Config;
