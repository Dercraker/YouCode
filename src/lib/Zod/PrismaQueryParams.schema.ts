import { z } from 'zod';

export const PrismaQueryParamsSchema = z.object({
  take: z.number().default(10),
  skip: z.number().default(0),
});

export type PrismaQueryPramsType = z.infer<typeof PrismaQueryParamsSchema>;
