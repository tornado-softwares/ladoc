import { get_configuration } from '@ladoc/core/configuration';
import { get_tree, get_tree_pages, resolve_language_directory } from '@ladoc/core/routing';

export const get_pages_map = async () => {
  const configuration = await get_configuration();
  return `export default {
    ${(
      await Promise.all(
        Object.keys(configuration.directories).map(async (_language) => {
          const { language, directory } = await resolve_language_directory(_language);
          const tree = get_tree(directory);
          const pages = get_tree_pages(tree);
          return `"${language}" : {
                ${pages.filter((page) => page.type == "page").map((page) => `        "${page.path}": () => import('virtual:ladoc:markdown:${page.file}')`).join(',\n')}
        }`;
        })
      )
    ).join(',\n')}
  };`;
};
