import { z } from 'zod';

export const CourseByIdQuerySchema = z.object({
  courseId: z.string(),
  userId: z.string(),
  allowCanceled: z.boolean().optional(),
});

export type CourseByIdQueryType = z.infer<typeof CourseByIdQuerySchema>;
