import type { Plugin } from 'vite';
import { PLUGIN_NAME, MARKDOWN_VIRTUAL_MODULE, PAGES_VIRTUAL_MODULE } from './constants';
import fs from 'fs';
import path from 'path';
import { get_root_dir } from '@ladoc/core/shared';
import { get_configuration } from '@ladoc/core/configuration';
import { get_page_tree, get_pages } from '@ladoc/core/routing';

export function plugin(): Plugin {
  const root = get_root_dir();

  return {
    name: PLUGIN_NAME,
    enforce: 'pre',

    async configureServer(server) {
      const configuration = await get_configuration();
      if (server.config.mode === 'development') {
        for (const directory of Object.keys(configuration.languages.directories)) {
          const directory_path = path.join(root, configuration.languages.directories[directory]);
          configuration.logger.debug(`Watching ${directory_path} .`);
          const tree = get_page_tree(directory_path);
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
          const configuration = await get_configuration();
          if (this.environment.mode == 'dev') {
            this.addWatchFile(file_path);
            configuration.logger.debug('watching', '[', this.environment.name, ']', file_path);
          }
          const content = fs.readFileSync(file_path);
          return `export default \`${content}\``;
        } else {
          return `export default \`This page doesnt exist.\``;
        }
      }
      if (id == PAGES_VIRTUAL_MODULE) {
        const configuration = await get_configuration();
        const tree = get_page_tree(configuration.languages.directories.default);
        const pages = get_pages(tree);
        /*for (const page of pages) {
          this.addWatchFile(page.file);
          }*/
        const map = `export default {
            ${pages.map((page) => `            "${page.path}": () => import('virtual:ladoc:markdown:${page.file}')`).join(',\n')}
        };`;
        // console.log(map);
        return map;
      }
    },
  };
}
