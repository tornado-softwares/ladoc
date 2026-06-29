import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import reactSVG from 'vite-react-svg';
export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    reactSVG({
      // optional
    }),
    //  svgr()
  ],
  publicDir: 'src/assets/public',
  resolve: {
    tsconfigPaths: true,
  },
});
