import { z } from 'zod';
import { LessonStateSchema } from './LessonState.schema';
import { LessonProgressSchema } from './LessonsProgress.schema';

export const LessonNavigationItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  state: LessonStateSchema,
  users: z.array(
    z.object({
      id: z.string(),
      progress: LessonProgressSchema,
    }),
  ),
});

export type LessonNavigationItemType = z.infer<
  typeof LessonNavigationItemSchema
>;
