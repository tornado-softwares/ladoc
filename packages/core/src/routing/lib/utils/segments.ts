import path from 'path';
import { naming } from './constants';

const parse_segment = (segment: string): string => {
  if (segment == '$') return '*';
  let optional = false;
  let escape = false;
  let param = false;
  let new_segment = '';
  for (const char of segment) {
    if (!escape && char == naming.escape.start) {
      escape = true;
      continue;
    }
    if (escape && char == naming.escape.end) {
      escape = false;
      continue;
    }
    /*if (!optional && char == configuration.routes.naming.optional.start) {
      optional = true;
      continue;
    }
    if (optional && char == configuration.routes.naming.optional.end) {
      optional = false;
      continue;
    }*/

    if (escape) {
      new_segment += char;
      continue;
    }

    if (char == naming.param.prefix) {
      new_segment += ':';
      continue;
    }

    new_segment += char;

    /*if (optional) {
      new_segment += char;
      console.log('TODO IMPLEMENT OPTIONAL');
      continue;
    }*/
  }
  return new_segment;
};

export const parse_segments = (route_path: string, level: number = 0): string =>
  '/' +
  route_path
    .replaceAll(path.win32.sep, '/')
    .split('/')
    .slice(level)
    .filter((p) => ![naming.index].includes(p))
    .map((p) => parse_segment(p))
    .join('/');
