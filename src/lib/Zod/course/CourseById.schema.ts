import { z } from 'zod';
import { LessonFromCourseByIdSchema } from '../lesson/LessonFromCourseById.schema';

export const CourseByIdSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  presentation: z.string(),
  creator: z.object({
    name: z.string().nullable(),
    image: z.string().nullable(),
  }),
  lessons: z.array(LessonFromCourseByIdSchema),
  _count: z.object({
    lessons: z.number(),
    users: z.number(),
  }),
});

export type CourseByIdType = z.infer<typeof CourseByIdSchema>;
