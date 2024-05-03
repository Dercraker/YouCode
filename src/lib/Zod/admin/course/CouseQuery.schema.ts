import { z } from 'zod';

export const CourseQuerySchema = z.object({
  id: z.string(),
  ownerId: z.string(),
});

export type CourseQuerySchemaType = z.infer<typeof CourseQuerySchema>;
