import { CourseQuerySchemaType } from '@/lib/Zod/admin/course/CouseQuery.schema';
import { prisma } from '@/lib/prisma/prisma';
import { Prisma } from '@prisma/client';

export const courseQuery = async ({
  id,
  ownerId,
  take,
  skip,
}: CourseQuerySchemaType) => {
  const course = await prisma.course.findUnique({
    where: {
      creatorId: ownerId,
      id: id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      state: true,
      users: {
        take: take,
        skip: (skip! - 1) * take!,
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              image: true,
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const users = course?.users.map(user => {
    return {
      ...user.user,
      canceled: user.canceledAt ? true : false,
    };
  });

  return { ...course, users };
};

export type CourseQueryType = NonNullable<
  Prisma.PromiseReturnType<typeof courseQuery>
>;
