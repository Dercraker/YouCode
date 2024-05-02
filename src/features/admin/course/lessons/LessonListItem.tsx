import { LessonType } from '@/lib/Zod/admin/course/lessons/Lesson.schema';
import { Badge, Burger, Group, Paper, Stack, Title } from '@mantine/core';

interface LessonListItemProps {
  lesson: LessonType;
}

const LessonListItem = ({ lesson }: LessonListItemProps) => {
  return (
    <Paper radius="md" px="xl" py="md" withBorder>
      <Group justify="space-between" align="end">
        <Stack gap={0}>
          <Badge m="0" radius="md" color={'red'}>
            {lesson.state}
          </Badge>
          <Title>{lesson.name}</Title>
        </Stack>
        <Burger />
      </Group>
    </Paper>
  );
};

export default LessonListItem;
