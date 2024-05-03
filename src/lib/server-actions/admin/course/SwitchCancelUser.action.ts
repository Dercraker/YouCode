'use server';

import { SwitchCancelUserSchema } from '@/lib/Zod/admin/course/SwitchCancelUser.schema';
import { prisma } from '@/lib/prisma/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';

export const SwitchCancelUserAction = authAction(
  SwitchCancelUserSchema,
  async ({ canceled, userId, courseId }, ctx) => {
    const courseOnUser = await prisma.courseOnUser.findFirst({
      where: {
        courseId,
        userId,
        course: {
          creatorId: ctx.user.id,
        },
      },
    });

    if (!courseOnUser) {
      throw new ActionError('No courses with this user');
    }

    await prisma.courseOnUser.update({
      where: {
        id: courseOnUser.id,
      },
      data: {
        canceledAt: canceled ? new Date() : null,
      },
    });

    return { success: true };
  },
);
