import { get_configuration } from '@ladoc/core/configuration';

// @ladoc/core
console.log(await get_configuration());
// get_page -> page | undefined
// get_paths_to_prerender -> string[]
// llms txt -> string
// llms full txt -> string

// @ladoc/vite

import ladoc from '@ladoc/vite';
import content from 'virtual:ladoc:./assets/content/test.mdx';

// plugin

// @ladoc/react
