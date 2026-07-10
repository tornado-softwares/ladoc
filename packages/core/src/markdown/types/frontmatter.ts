import type z from 'zod';
import type { frontmatter_schema } from '../lib/schemas/frontmatter';

export type frontmatter = z.infer<typeof frontmatter_schema>;
