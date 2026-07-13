import type { parsed_ladoc_configuration } from '@/configuration';
export type engine = parsed_ladoc_configuration['markdown']['engine'];
export type parser_output = {type:"html", html:string} | { type:"module", code:string}
export type parser = (content: string) => Promise<parser_output>;
export type engines = Record<engine, parser>;
