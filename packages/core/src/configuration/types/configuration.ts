import type z from 'zod';
import { configuration_schema } from '@/configuration/lib/schemas/configuration';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type configuration_type = z.infer<typeof configuration_schema>;
export type partial_configuration_type = DeepPartial<configuration_type>;

export interface logger {
  debug(msg: string, ...args: unknown[]): void;
  info(msg: string, ...args: unknown[]): void;
  warn(msg: string, ...args: unknown[]): void;
  error(msg: string, ...args: unknown[]): void;
}
