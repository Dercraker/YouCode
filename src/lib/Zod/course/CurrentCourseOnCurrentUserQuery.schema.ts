import { z } from 'zod';

export const CourseByIdQuerySchema = z.object({
  couseId: z.string(),
  userId: z.string(),
});

export type CourseByIdQueryType = z.infer<typeof CourseByIdQuerySchema>;
