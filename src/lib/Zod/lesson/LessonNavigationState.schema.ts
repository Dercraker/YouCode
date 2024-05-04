import { z } from 'zod';

export const LessonNavigationEnum = z.enum(['open', 'close', 'sticky']);

export type LessonNavigationEnum = z.infer<typeof LessonNavigationEnum>;
