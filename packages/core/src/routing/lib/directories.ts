import { get_configuration } from '@/configuration';

export const resolve_language_directory = async (_language?: string) => {
  const configuration = await get_configuration();
  let language = configuration.languages.default;
  let directory = configuration.directories.default;
  if (_language && _language != 'default' && Object.keys(configuration.directories).includes(_language)) {
    language = _language;
    directory = configuration.directories[_language];
  }
  return { language, directory };
};
