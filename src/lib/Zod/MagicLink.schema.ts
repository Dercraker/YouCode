import { z } from 'zod';

export const MagicLinkSchema = z.object({
  email: z.string().email(),
});

export type MagicLinkType = z.infer<typeof MagicLinkSchema>;
