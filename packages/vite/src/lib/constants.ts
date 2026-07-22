import { get_configuration, type parsed_ladoc_configuration } from '@ladoc/core/configuration';
import { get_root_dir } from '@ladoc/core/shared';

export const PLUGIN_NAME = 'ladoc';
export const MARKDOWN_VIRTUAL_MODULE = 'virtual:ladoc:markdown:';
export const PAGES_VIRTUAL_MODULE = 'virtual:ladoc:pages';
export const TREE_VIRTUAL_MODULE = 'virtual:ladoc:tree';

export const ROOT = get_root_dir();
export const CONFIGURATION: parsed_ladoc_configuration = await get_configuration();
