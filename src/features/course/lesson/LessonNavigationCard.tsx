'use client';

import { useLessonNavigation } from '@/hooks/useLessonNavigation';
import { LessonNavigationEnum } from '@/lib/Zod/lesson/LessonNavigationState.schema';
import { useLessonNavigationStore } from '@/lib/zustand/LessonNavigation.store';
import {
  ActionIcon,
  Drawer,
  Group,
  Paper,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from '@tabler/icons-react';
import { CourseType } from '../GetCourseQuery';
import LessonNavigationList from './LessonNavigationList';

interface LessonNavigationProps {
  course: CourseType;
}

const LessonNavigationCard = ({ course }: LessonNavigationProps) => {
  const theme = useMantineTheme();

  const state = useLessonNavigation();
  const setState = useLessonNavigationStore(state => state.setState);

  if (state === LessonNavigationEnum.enum.sticky)
    return (
      <Paper
        shadow="xl"
        p="xl"
        withBorder
        flex={1}
        mah="80vh"
        miw="18em"
        style={{ overflowY: 'scroll' }}>
        <Stack>
          <Group justify="space-between" align="center">
            <Title>{course.name}</Title>
            <ActionIcon
              variant="subtle"
              size="lg"
              color="#c9c9c9"
              onClick={() => setState(LessonNavigationEnum.enum.close)}>
              <IconLayoutSidebarLeftCollapse size="lg" />
            </ActionIcon>
          </Group>
          <LessonNavigationList course={course} />
        </Stack>
      </Paper>
    );

  return (
    <Drawer
      opened={state === LessonNavigationEnum.enum.open}
      onClose={() => setState(LessonNavigationEnum.enum.close)}
      title={
        <Group align="center">
          <Title>Lessons</Title>
          <ActionIcon
            variant="subtle"
            size="lg"
            color="#c9c9c9"
            onClick={() => setState(LessonNavigationEnum.enum.sticky)}>
            <IconLayoutSidebarRightCollapse size="lg" />
          </ActionIcon>
        </Group>
      }>
      <LessonNavigationList course={course} />
    </Drawer>
  );
};

export default LessonNavigationCard;
