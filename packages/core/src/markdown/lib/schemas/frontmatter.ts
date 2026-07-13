import z from 'zod';

export const page_frontmatter_schema = z.object({
  title: z.string().default('No title.'),
  description: z.string().default('No description.'),
  order: z.number().optional(),
  icon: z.string().optional(),
});

export const data_frontmatter_schema = z.object({
  title: z.string().default('No title.'),
  icon: z.string().optional(),
  order: z.number().optional(),
});
