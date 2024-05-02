'use server';

import { EditCourseSchema } from '@/lib/Zod/admin/course/EditCourse.schema';
import { prisma } from '@/lib/prisma/prisma';
import { authAction } from '@/lib/server-actions/safe-actions';

export const EditCourseAction = authAction(
  EditCourseSchema,
  async ({ id, image, name, presentation, state }, ctx) => {
    const course = await prisma.course.update({
      where: {
        id,
      },
      data: {
        image,
        name,
        presentation,
        state,
      },
    });

    return course;
  },
);
