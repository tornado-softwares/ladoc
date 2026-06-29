export type Content = {
  id: string;
  file: string;
  path: string;
  index?: boolean;
};

export type Category = {
  id: string;
  children?: Page[];
};

export type Page = Content | Category;
