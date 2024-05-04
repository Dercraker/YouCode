import { ServerMdx } from '@/lib/markdown/ServerMdx';
import { Paper, Stack, Title } from '@mantine/core';
import { LessonType } from './lesson.query';

interface LessonProps {
  lesson: LessonType;
}

const Lesson = ({ lesson }: LessonProps) => {
  return (
    <Paper shadow="xl" p="xl" withBorder flex={5}>
      <Stack>
        <Title>{lesson.name}</Title>
        <ServerMdx source={lesson.content} />
      </Stack>
    </Paper>
  );
};

export default Lesson;
