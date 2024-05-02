import { z } from 'zod';
import { PrismaQueryParamsSchema } from '../PrismaQueryParams.schema';

export const CoursesQuerySchema = z.object({
  params: PrismaQueryParamsSchema,
});

export type CoursesQuerySchemaType = z.infer<typeof CoursesQuerySchema>;
