import z from 'zod';

export const engine_schema = z.enum(['bun', 'mdx-bundler', 'mdx-js', 'ladoc']).default('ladoc');
