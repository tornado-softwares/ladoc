import z from 'zod';

export const frontmatter_schema = z.object({
  title: z.string().default('No title.'),
  description: z.string().default('No description.'),
  order: z.number().optional(),
  icon: z.string().optional(),
});

export type frontmatter = z.infer<typeof frontmatter_schema>;
