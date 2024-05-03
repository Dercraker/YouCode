import { z } from 'zod';

export const CourseBySlugQuerySchema = z.object({
  couseId: z.string(),
  userId: z.string(),
});

export type CourseBySlugQueryType = z.infer<typeof CourseBySlugQuerySchema>;
