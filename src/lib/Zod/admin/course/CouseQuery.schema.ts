import { z } from 'zod';

export const CourseQuerySchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  take: z.number().optional(),
  skip: z.number().optional(),
});

export type CourseQuerySchemaType = z.infer<typeof CourseQuerySchema>;
