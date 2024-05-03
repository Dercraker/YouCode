import { z } from 'zod';

export const LessonMoveSchema = z.object({
  upItemRank: z.string().optional(),
  downItemRank: z.string().optional(),
  lessonId: z.string(),
  courseId: z.string(),
});

export type LessonMoveType = z.infer<typeof LessonMoveSchema>;
