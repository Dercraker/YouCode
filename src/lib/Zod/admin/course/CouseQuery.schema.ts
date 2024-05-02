import { z } from 'zod';

export const CourseQuerySchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  take: z.number().optional().default(10),
  skip: z.number().default(0),
});

export type CourseQuerySchemaType = z.infer<typeof CourseQuerySchema>;
