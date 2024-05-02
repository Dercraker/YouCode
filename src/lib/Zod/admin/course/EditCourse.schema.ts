import { z } from 'zod';
import { CourseSateSchema } from './CourseState.schema';

export const EditCourseSchema = z.object({
  id: z.string().min(1),
  image: z.string().min(1).url(),
  name: z.string().min(1),
  presentation: z.string().min(1),
  state: CourseSateSchema,
});

export type EditCourseType = z.infer<typeof EditCourseSchema>;
