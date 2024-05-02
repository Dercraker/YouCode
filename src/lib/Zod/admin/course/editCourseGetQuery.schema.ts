import { z } from 'zod';
import { CourseSateSchema } from './CourseState.schema';

export const EditCourseGetQuerySchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  presentation: z.string(),
  state: CourseSateSchema,
});

export type EditCourseGetQueryType = z.infer<typeof EditCourseGetQuerySchema>;
