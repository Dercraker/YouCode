import { z } from 'zod';
import { CourseStateSchema } from './CourseState.schema';

export const EditCourseGetQuerySchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  presentation: z.string(),
  state: CourseStateSchema,
});

export type EditCourseGetQueryType = z.infer<typeof EditCourseGetQuerySchema>;
