import {get_tree as gt, resolve_language_directory} from "@ladoc/core/routing"

export const get_tree = async (_language?: string) => {
  const { language, directory } = await resolve_language_directory(_language);
  const tree = gt(directory)
  return { language, tree}
}
