'use server';

import { prisma } from '@/lib/prisma/prisma';
import { authAction } from '@/lib/server-actions/safe-actions';
import { z } from 'zod';

export const CoursesByOwnerIdGETAction = authAction(
  z.null(),
  async (_, ctx) => {
    const courses = await prisma.course.findMany({
      where: {
        creatorId: ctx.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return courses;
  },
);
