import { requiredAuth } from '@/lib/auth/helper';
import { Group, Paper, Stack, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import { GetCourseQuery } from '../GetCourseQuery';
import LessonNavigationList from './LessonNavigationList';

interface LessonNavigationProps {
  courseId: string;
}

const LessonNavigation = async ({ courseId }: LessonNavigationProps) => {
  const user = await requiredAuth();

  const course = await GetCourseQuery({ courseId });
  if (!course) {
    return notFound();
  }

  return (
    <Paper
      shadow="xl"
      p="xl"
      withBorder
      flex={1}
      mah="80vh"
      style={{ overflowY: 'scroll' }}>
      <Stack>
        <Group>
          <Title>{course.name}</Title>
        </Group>
        <LessonNavigationList course={course} />
      </Stack>
    </Paper>
  );
};

export default LessonNavigation;
