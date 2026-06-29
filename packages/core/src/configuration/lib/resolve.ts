import { configuration_schema } from './schemas/configuration';
import fs from 'fs';
import path from 'path';
import type { configuration_type } from '../types/configuration';
import { get_root_dir } from '@/shared/utils/root';

export const get_configuration = async (): Promise<configuration_type> => {
  const root = get_root_dir();
  const file_path = path.join(root, 'ladoc.config.ts');
  if (fs.existsSync(file_path)) {
    const mod = await import(file_path);
    if ('default' in mod && typeof mod.default == 'object') {
      return configuration_schema.parse(mod.default);
    }
  }
  return configuration_schema.parse({});
};
