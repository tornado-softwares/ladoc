import type { Plugin, ViteDevServer } from 'vite';
import { PLUGIN_NAME, MARKDOWN_VIRTUAL_MODULE, PAGES_VIRTUAL_MODULE, CONFIGURATION, ROOT } from './constants';
import fs from 'fs';
import path from 'path';
import { get_pages_map } from './utils';
import { get_markdown_html, extract_frontmatter, extract_toc, page_frontmatter_schema } from '@ladoc/core/markdown';

export function plugin(): Plugin {
  let server: ViteDevServer | undefined;

  return {
    name: PLUGIN_NAME,
    enforce: 'pre',

    configureServer(_server) {
      server = _server;

      if (server.config.mode !== 'development') {
        return;
      }

      const invalidatePagesModule = () => {
        const mod = server!.moduleGraph.getModuleById(PAGES_VIRTUAL_MODULE);

        if (mod) {
          server!.moduleGraph.invalidateModule(mod);
        }

        server!.ws.send({
          type: 'full-reload',
        });
      };

      for (const directory of Object.values(CONFIGURATION.directories)) {
        const directoryPath = path.join(ROOT, directory);

        server.watcher.add(directoryPath);

        server.watcher.on('add', (file) => {
          if (file.startsWith(directoryPath + path.sep)) {
            CONFIGURATION.logger.debug(`File added: ${file}`);
            invalidatePagesModule();
          }
        });

        server.watcher.on('unlink', (file) => {
          if (file.startsWith(directoryPath + path.sep)) {
            CONFIGURATION.logger.debug(`File removed: ${file}`);
            invalidatePagesModule();
          }
        });
      }
    },

    resolveId(id) {
      if (id.startsWith(MARKDOWN_VIRTUAL_MODULE)) {
        return id;
      }

      if (id === PAGES_VIRTUAL_MODULE) {
        return id;
      }
    },

    async load(id) {
      if (id.startsWith(MARKDOWN_VIRTUAL_MODULE)) {
        const filePath = id.slice(MARKDOWN_VIRTUAL_MODULE.length);

        if (!fs.existsSync(filePath)) {
          return `export default \`This page doesn't exist.\`;`;
        }

        if (this.environment.mode === 'dev') {
          this.addWatchFile(filePath);
          CONFIGURATION.logger.debug('watching', `[${this.environment.name}]`, filePath);
        }

        const content = fs.readFileSync(filePath, 'utf8');

        const { frontmatter, markdown: markdown1 } = extract_frontmatter(content, page_frontmatter_schema);

        const { toc, markdown: markdown2 } = extract_toc(markdown1);
        const html = await get_markdown_html(markdown2, frontmatter.engine);

        return `
          export default {
            frontmatter: ${JSON.stringify(frontmatter)},
            toc: ${JSON.stringify(toc)},
            engine_output: ${JSON.stringify(html)}
          };
        `;
      }

      if (id === PAGES_VIRTUAL_MODULE) {
        return await get_pages_map();
      }
    },
  };
}
