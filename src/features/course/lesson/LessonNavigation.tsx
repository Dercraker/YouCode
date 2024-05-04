import { requiredAuth } from '@/lib/auth/helper';
import { ActionIcon, Group, Paper, Stack, Title } from '@mantine/core';
import { IconLayoutSidebarLeftExpandFilled } from '@tabler/icons-react';
import { CourseType } from '../GetCourseQuery';
import LessonNavigationList from './LessonNavigationList';

interface LessonNavigationProps {
  course: CourseType;
}

const LessonNavigation = async ({ course }: LessonNavigationProps) => {
  const user = await requiredAuth();

  return (
    <Paper
      shadow="xl"
      p="xl"
      withBorder
      flex={1}
      mah="80vh"
      style={{ overflowY: 'scroll' }}>
      <Stack>
        <LessonNavigationList course={course} />
      </Stack>
    </Paper>
  );
};

export default LessonNavigation;
