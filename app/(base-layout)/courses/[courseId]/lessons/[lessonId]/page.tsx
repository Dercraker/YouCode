import JoinButton from '@/features/course/JoinButton';
import Lesson from '@/features/course/lesson/Lesson';
import LessonNavigation from '@/features/course/lesson/LessonNavigation';
import { lessonQuery } from '@/features/course/lesson/lesson.query';
import { requiredAuth } from '@/lib/auth/helper';
import { prisma } from '@/lib/prisma/prisma';
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
      <LessonNavigation courseId={courseId} />
      <Lesson lesson={lesson} />
    </Group>
  );
};

export default RoutePage;
