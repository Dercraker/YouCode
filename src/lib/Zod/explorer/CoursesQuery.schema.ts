import { z } from 'zod';
import { PrismaQueryParamsSchema } from '../PrismaQueryParams.schema';

export const CoursesQuerySchema = z.object({
  params: PrismaQueryParamsSchema,
  userId: z.string().optional(),
});

export type CoursesQuerySchemaType = z.infer<typeof CoursesQuerySchema>;
