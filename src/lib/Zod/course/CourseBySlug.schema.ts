import { z } from 'zod';
import { LessonFromCourseBySlugSchema } from '../lesson/LessonFromCourseBySlug.schema';

export const CourseBySlugSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  presentation: z.string(),
  creator: z.object({
    name: z.string().nullable(),
    image: z.string().nullable(),
  }),
  lessons: z.array(LessonFromCourseBySlugSchema),
  _count: z.object({
    lessons: z.number(),
    users: z.number(),
  }),
});

export type CourseBySlugType = z.infer<typeof CourseBySlugSchema>;
