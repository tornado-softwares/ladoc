import z from "zod";

export const plugins_schema = z
  .object({
    syntax_highlighting: z.boolean().default(true),
    mermaid: z.boolean().default(false),
    latex: z.boolean().default(true),
  })
  .default({
    syntax_highlighting: true,
    mermaid: false,
    latex: true,
  });
