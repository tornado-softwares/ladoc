import type { logger_functions } from '@/configuration/types/logger';
import z from 'zod';

export const logger_schema = z.custom<logger_functions>().default(console);
