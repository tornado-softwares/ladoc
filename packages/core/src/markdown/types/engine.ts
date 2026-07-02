import type { parsed_ladoc_configuration } from '@/configuration';

export type engine = parsed_ladoc_configuration['markdown']['engine'];
export type parser = (content: string) => Promise<string>;
export type engines = Record<engine, parser>;
