export type File = {
  type: 'file';
  name: string;
  id: string;
  extension: string;
  path: string;
};

export type Directory = {
  type: 'directory';
  id: string;
  path: string;
  name: string;
  children: Object[];
};

export type Object = Directory | File;
