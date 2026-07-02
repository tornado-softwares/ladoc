import z from 'zod';

export const directories_schema = z
  .object({
    default: z.string(),
  })
  .catchall(z.string())
  .default({
    default: './documentation',
  });
