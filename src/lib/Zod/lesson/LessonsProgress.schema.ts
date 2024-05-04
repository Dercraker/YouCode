import { z } from 'zod';

export const LessonProgressSchema = z.enum([
  'NOT_STARTED',
  'IN_PROGRESS',
  'COMPLETED',
]);

export type LessonProgressType = z.infer<typeof LessonProgressSchema>;
