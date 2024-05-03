'use client';

import NoLessons from '@/components/lessons/NoLessons';
import { LessonFromCourseByIdType } from '@/lib/Zod/lesson/LessonFromCourseById.schema';
import { List, Paper, Stack, ThemeIcon, Title, rem } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import LessonItem from './LessonItem';

interface LessonsListProps {
  lessons: LessonFromCourseByIdType[];
  courseId: string;
}

const LessonsList = ({ lessons, courseId }: LessonsListProps) => {
  const lessonsItems = lessons.map(lesson => (
    <LessonItem key={lesson.id} lesson={lesson} courseId={courseId} />
  ));

  return (
    <Paper
      shadow="xl"
      p="xl"
      withBorder
      flex={1}
      mah="80vh"
      miw="10em"
      style={{ overflowY: 'scroll' }}>
      <Stack>
        <Title order={3}>Lessons</Title>

        {lessons.length === 0 && <NoLessons />}
        {lessons.length !== 0 && (
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }>
            {lessonsItems}
          </List>
        )}
      </Stack>
    </Paper>
  );
};

export default LessonsList;
