import { z } from 'zod';

export const SwitchCancelUserSchema = z.object({
  canceled: z.boolean(),
  userId: z.string(),
  courseId: z.string(),
});

export type SwitchCancelUserSchemaType = z.infer<typeof SwitchCancelUserSchema>;
