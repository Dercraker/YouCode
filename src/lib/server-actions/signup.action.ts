'use server';

import { setupResendCustomer } from '@/lib/auth/auth-config-setup';
import {
  hashStringWithSalt,
  validatePassword,
} from '@/lib/auth/credentialsProvider';
import { prisma } from '@/lib/prisma/prisma';
import { ActionError, action } from '@/lib/server-actions/safe-actions';
import {
  SignUpCredentialSchema,
  SignUpCredentialType,
} from '../Zod/SignUpCredential.schema';
import { env } from '../env/server';

export const signUpAction = action(
  SignUpCredentialSchema,
  async ({ email, password, name }: SignUpCredentialType) => {
    if (!validatePassword(password)) {
      throw new ActionError(
        'Invalid new password. Must be at least 8 characters, and contain at least one letter and one number',
      );
    }

    try {
      const userData = {
        email,
        passwordHash: hashStringWithSalt(password, env.NEXTAUTH_SECRET),
        name,
      };

      const resendContactId = await setupResendCustomer(userData);

      const user = await prisma.user.create({
        data: {
          ...userData,
          resendContactId,
        },
      });

      return user;
    } catch {
      throw new ActionError('Email already exists');
    }
  },
);
