'use server';

import {
  UpdateUserInformationSchema,
  UpdateUserInformationType,
} from '@/lib/Zod/account/settings/UpdateUserInformation.schema';
import { prisma } from '@/lib/prisma/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';

export const UpdateUserInformationAction = authAction(
  UpdateUserInformationSchema,
  async ({ image, name }: UpdateUserInformationType, ctx) => {
    try {
      await prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          image,
          name,
        },
      });
    } catch (error) {
      return new ActionError('Failed to update user information.');
    }
  },
);
