import type z from 'zod';
import type { data_frontmatter_schema, page_frontmatter_schema  } from '../lib/schemas/frontmatter';

export type page_frontmatter = z.infer<typeof page_frontmatter_schema>;
export type data_frontmatter = z.infer<typeof data_frontmatter_schema>;
