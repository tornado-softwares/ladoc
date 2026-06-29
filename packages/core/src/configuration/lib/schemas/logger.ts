import type { logger } from "@/configuration/types/configuration";
import z from "zod";

export const logger_schema = z.custom<logger>().default(console);
