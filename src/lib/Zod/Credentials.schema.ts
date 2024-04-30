import { z } from 'zod';

export const CredentialSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).optional(),
});

export type CredentialType = z.infer<typeof CredentialSchema>;
