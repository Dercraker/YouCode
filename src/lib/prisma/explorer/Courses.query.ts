import { CoursesQuerySchemaType } from '@/lib/Zod/explorer/CoursesQuery.schema';
import { prisma } from '../prisma';

const coursesQuery = async ({
  params: { skip, take },
  userId,
}: CoursesQuerySchemaType) => {
  const whereQuery = userId
    ? {
        users: {
          some: {
            userId: userId,
            canceledAt: null,
          },
        },
      }
    : undefined;

  const courses = await prisma.course.findMany({
    where: whereQuery,
    take: take,
    skip: (skip - 1) * take,
    select: {
      id: true,
      name: true,
      image: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return courses;
};

export default coursesQuery;
