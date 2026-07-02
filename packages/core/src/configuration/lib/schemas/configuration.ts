import z from 'zod';
import { markdown_schema } from './markdown';
import { logger_schema } from './logger';
import { languages_schema } from './languages';
import { directories_schema } from './directories';

export const configuration_schema = z.object({
  logger: logger_schema,
  markdown: markdown_schema,
  languages: languages_schema,
  directories: directories_schema,
});
