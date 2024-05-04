'use server';

import { NewCourseSchema } from '@/lib/Zod/admin/course/NewCourse.schema';
import { prisma } from '@/lib/prisma/prisma';
import { authAction } from '@/lib/server-actions/safe-actions';

export const NewCourseAction = authAction(
  NewCourseSchema,
  async ({ image, name, presentation, state }, ctx) => {
    const course = await prisma.course.create({
      data: {
        image,
        name,
        presentation,
        state,
        creatorId: ctx.user.id,
      },
    });

    if (course)
      await prisma.courseOnUser.create({
        data: {
          courseId: course.id,
          userId: ctx.user.id,
        },
      });

    return course;
  },
);
