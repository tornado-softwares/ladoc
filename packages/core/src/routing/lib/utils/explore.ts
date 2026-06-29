import path from 'path';
import fs from 'fs';
import type { Object } from '@/routing/types/structure';

export const explore = (data: { path: string; extensions: string[]; id?: string }): Object | undefined => {
  const exists = fs.existsSync(data.path);
  if (!exists) {
    return undefined;
  } else {
    const stats = fs.statSync(data.path);
    const { name, ext } = path.parse(data.path);
    if (stats.isFile() && data.extensions.includes(ext)) {
      const id = data.id ? data.id + '/' + name : name;
      const extension = ext.slice(1);
      return { type: 'file', name, extension, id, path: path.resolve(data.path) };
    }
    if (stats.isDirectory()) {
      const id = data.id ? data.id + '/' + name + ext : name + ext;
      const sub_paths = fs.readdirSync(data.path).map((sub_path) => path.join(data.path, sub_path));
      const children: Object[] = [];
      for (const sub_path of sub_paths) {
        const object = explore({
          path: sub_path,
          extensions: data.extensions,
          id,
        });
        if (object) children.push(object);
      }
      return {
        type: 'directory',
        name: name + ext,
        id,
        path: path.resolve(data.path),
        children,
      };
    }
  }
};
