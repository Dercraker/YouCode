import { z } from 'zod';
import { LessonStateSchema } from './LessonState.schema';
import { LessonProgressSchema } from './LessonsProgress.schema';

export const LessonFromCourseBySlugSchema = z.object({
  name: z.string(),
  id: z.string(),
  courseId: z.string(),
  state: LessonStateSchema,
  progress: LessonProgressSchema,
  users: z.array(
    z.object({
      progress: LessonProgressSchema,
    }),
  ),
});

export type LessonFromCourseBySlugType = z.infer<
  typeof LessonFromCourseBySlugSchema
>;
