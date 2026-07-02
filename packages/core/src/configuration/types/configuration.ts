import type z from 'zod';
import { configuration_schema } from '@/configuration/lib/schemas/configuration';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type parsed_ladoc_configuration = z.infer<typeof configuration_schema>;
export type partial_ladoc_configuration = DeepPartial<parsed_ladoc_configuration>;
