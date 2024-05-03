import { CourseQuerySchemaType } from '@/lib/Zod/admin/course/CouseQuery.schema';
import { prisma } from '@/lib/prisma/prisma';

export const LessonQuery = async ({ id, ownerId }: CourseQuerySchemaType) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: id,
      course: {
        creatorId: ownerId,
      },
    },
    select: {
      id: true,
      name: true,
      rank: true,
      content: true,
      state: true,
      createdAt: true,
      course: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      rank: 'asc',
    },
  });

  return lessons;
};
