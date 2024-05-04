import { z } from 'zod';
import { LessonStateSchema } from './LessonState.schema';
import { LessonProgressSchema } from './LessonsProgress.schema';

export const LessonFromCourseByIdSchema = z.object({
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

export type LessonFromCourseByIdType = z.infer<
  typeof LessonFromCourseByIdSchema
>;
