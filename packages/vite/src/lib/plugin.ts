import type { Plugin } from 'vite';
import { PLUGIN_NAME, MARKDOWN_VIRTUAL_MODULE, PAGES_VIRTUAL_MODULE, CONFIGURATION, ROOT } from './constants';
import fs from 'fs';
import path from 'path';
import { get_pages_map } from './utils';
import { get_tree } from '@ladoc/core/routing';
import { get_markdown_html } from '@ladoc/core/markdown';

export function plugin(): Plugin {
  return {
    name: PLUGIN_NAME,
    enforce: 'pre',

    async configureServer(server) {
      if (server.config.mode === 'development') {
        for (const directory of Object.keys(CONFIGURATION.directories)) {
          const directory_path = path.join(ROOT, CONFIGURATION.directories[directory]);
          CONFIGURATION.logger.debug(`Watching ${directory_path} .`);
          const tree = get_tree(directory_path);
          console.log(tree);
          server.watcher.on('add', (file) => {
            if (file.startsWith(directory_path + path.sep)) {
              console.log('File added:', file);
            }
          });
          server.watcher.on('unlink', (file) => {
            if (file.startsWith(directory_path + path.sep)) {
              console.log('File deleted:', file);
            }
          });
        }
      }
    },

    resolveId(id) {
      if (id.startsWith(MARKDOWN_VIRTUAL_MODULE)) {
        return id;
      }
      if (id == PAGES_VIRTUAL_MODULE) {
        return id;
      }
    },

    async load(id) {
      if (id.startsWith(MARKDOWN_VIRTUAL_MODULE)) {
        const file_path = id.slice(MARKDOWN_VIRTUAL_MODULE.length);
        if (fs.existsSync(file_path)) {
          if (this.environment.mode == 'dev') {
            this.addWatchFile(file_path);
            CONFIGURATION.logger.debug('watching', '[', this.environment.name, ']', file_path);
          }
          const content = fs.readFileSync(file_path, 'utf-8');
          const html = await get_markdown_html(content);
          return `export default \`${html}\``;
        } else {
          return `export default \`This page doesnt exist.\``;
        }
      }
      if (id == PAGES_VIRTUAL_MODULE) {
        return await get_pages_map();
      }
    },
  };
}
