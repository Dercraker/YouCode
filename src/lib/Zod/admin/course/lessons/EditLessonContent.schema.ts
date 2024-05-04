import { z } from 'zod';

export const EditLessonContentSchema = z.object({
  id: z.string().min(1),
  markdown: z.string().min(1),
});

export type EditLessonContentType = z.infer<typeof EditLessonContentSchema>;
