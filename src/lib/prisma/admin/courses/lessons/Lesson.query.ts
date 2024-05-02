import { CourseQuerySchemaType } from '@/lib/Zod/admin/course/CouseQuery.schema';
import { prisma } from '@/lib/prisma/prisma';

export const LessonQuery = async ({
  id,
  ownerId,
  take,
  skip,
}: CourseQuerySchemaType) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: id,
      course: {
        creatorId: ownerId,
      },
    },
    take: take,
    skip: (skip - 1) * take,
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
  });
  console.log('🚀 ~ lessons:', lessons);

  return lessons;
};
