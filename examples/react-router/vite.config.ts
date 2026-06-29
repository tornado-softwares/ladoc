import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import ladocPlugin from '@ladoc/vite';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), ladocPlugin()],
  publicDir: 'src/assets/public',
  resolve: {
    tsconfigPaths: true,
  },
});
