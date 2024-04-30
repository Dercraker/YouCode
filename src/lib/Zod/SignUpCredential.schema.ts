import { z } from 'zod';

export const SignUpCredentialSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    verifyPassword: z.string().min(8),
  })
  .refine(data => data.password === data.verifyPassword, {
    message: "Password does't match",
    path: ['verifyPassword'],
  });

export type SignUpCredentialType = z.infer<typeof SignUpCredentialSchema>;
