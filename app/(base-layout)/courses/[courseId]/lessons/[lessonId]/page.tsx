import { GetCourseQuery } from '@/features/course/GetCourseQuery';
import JoinButton from '@/features/course/JoinButton';
import Lesson from '@/features/course/lesson/Lesson';
import LessonNavigationCard from '@/features/course/lesson/LessonNavigationCard';
import { lessonQuery } from '@/features/course/lesson/lesson.query';
import { LessonProgressSchema } from '@/lib/Zod/lesson/LessonsProgress.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { prisma } from '@/lib/prisma/prisma';
import { MarkInProgressAction } from '@/lib/server-actions/course/lesson/MarkInProgress.action';
import { PageParams } from '@/types/next';
import { Container, Divider, Group, Stack, Title } from '@mantine/core';
import { notFound } from 'next/navigation';

type RoutePageProps = {
  courseId: string;
  lessonId: string;
};

const RoutePage = async ({
  params: { courseId, lessonId },
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const lesson = await lessonQuery({ lessonId, userId: user.id });
  console.log('🚀 ~ lesson:', lesson);

  if (!lesson) {
    notFound();
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      users: {
        where: {
          userId: user.id ?? '-',
          canceledAt: null,
        },
      },
    },
  });

  const course = await GetCourseQuery({ courseId });
  if (!course) {
    return notFound();
  }

  if (
    user &&
    lesson &&
    isAuthorized?.users.length &&
    (lesson.users.length === 0 ||
      lesson.users[0].progress === LessonProgressSchema.enum.NOT_STARTED)
  )
    await MarkInProgressAction(lessonId);

  if (lesson.state !== 'PUBLIC' && !isAuthorized?.users.length) {
    return (
      <Container>
        <Title>You need to join course to view this lesson.</Title>
        <Divider mb="md" />
        <Stack>
          <JoinButton courseId={courseId} />
        </Stack>
      </Container>
    );
  }

  return (
    <Group align="start">
      <LessonNavigationCard course={course} />
      <Lesson lesson={lesson} />
    </Group>
  );
};

export default RoutePage;
