import { get_configuration } from '@ladoc/core/configuration';
import { get_tree, get_tree_pages, resolve_language_directory } from '@ladoc/core/routing';

export const get_pages = async (_language?: string) => {
  const { language, directory } = await resolve_language_directory(_language);
  const tree = get_tree(directory);
  const pages = get_tree_pages(tree);
  return { language, pages };
};

export const get_page = async (path: string, _language?: string) => {
  const { language, pages } = await get_pages(_language);
  for (const page of pages) {
    if (page.path == path) {
      return { language, path: page.path };
    }
  }
};

export const get_static_paths = async () => {
  const configuration = await get_configuration();
  const paths: { language: string; path: string }[] = [];
  for (const _language of Object.keys(configuration.directories)) {
    const { language, pages } = await get_pages(_language);
    for (const page of pages) paths.push({ language, path: page.path });
  }
  return paths;
};
