import { configuration_schema } from './schemas/configuration';
import fs from 'fs';
import path from 'path';
import { get_root_dir } from '@/shared/utils/root';
import type { parsed_ladoc_configuration } from '../types/configuration';

let cache: parsed_ladoc_configuration | undefined;

export const get_configuration = async () => {
  if (!cache) {
    const configuration = await load_configuration();
    cache = configuration;
    configuration.logger.debug('cached configuration.');
  }
  return cache;
};

const load_configuration = async (): Promise<parsed_ladoc_configuration> => {
  const root = get_root_dir();
  const file_path = path.join(root, 'ladoc.config.ts');
  if (fs.existsSync(file_path)) {
    const mod = await import(/* @vite-ignore */ file_path);
    if ('default' in mod && typeof mod.default == 'object') {
      return configuration_schema.parse(mod.default);
    }
  }
  return configuration_schema.parse({});
};
