import z from "zod";
import { directories_schema } from "./directories";

export const languages_schema = z
  .object({
    directories: directories_schema,
  })
  .default({
    directories: {
      default: "./documentation",
    },
  });
