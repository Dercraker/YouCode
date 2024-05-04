import { z } from 'zod';
import { CourseStateSchema } from './CourseState.schema';

export const EditCourseSchema = z.object({
  id: z.string().min(1),
  image: z.string().min(1).url(),
  name: z.string().min(1),
  presentation: z.string().min(1),
  state: CourseStateSchema,
});

export type EditCourseType = z.infer<typeof EditCourseSchema>;
