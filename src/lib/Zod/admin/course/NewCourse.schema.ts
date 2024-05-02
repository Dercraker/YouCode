import { z } from 'zod';
import { CourseSateSchema } from './CourseState.schema';

export const NewCourseSchema = z.object({
  image: z.string().min(1).url(),
  name: z.string().min(1),
  presentation: z.string().min(1),
  state: CourseSateSchema.default('DRAFT'),
});

export type NewCourseType = z.infer<typeof NewCourseSchema>;
