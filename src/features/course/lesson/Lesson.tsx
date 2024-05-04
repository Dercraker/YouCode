import { LessonProgressSchema } from '@/lib/Zod/lesson/LessonsProgress.schema';
import { ServerMdx } from '@/lib/markdown/ServerMdx';
import { MarkAsCompleteAction } from '@/lib/server-actions/course/lesson/MarkAsComplete.Action';
import { MarkInProgressAction } from '@/lib/server-actions/course/lesson/MarkInProgress.action';
import { Button, Group, Paper, Stack, Title } from '@mantine/core';
import OpenLessonNavigationDrawerButton from './OpenLessonNavigationDrawerButton';
import { LessonType } from './lesson.query';

interface LessonProps {
  lesson: LessonType;
}

const Lesson = ({ lesson }: LessonProps) => {
  return (
    <Paper shadow="xl" p="xl" withBorder miw="40em" flex={5}>
      <Stack>
        <Group align="center">
          <OpenLessonNavigationDrawerButton />
          <Title>{lesson.name}</Title>
        </Group>
        <ServerMdx source={lesson.content} />
        <Group justify="end">
          <form>
            {lesson.users.length !== 0 &&
              lesson.users[0].progress ===
                LessonProgressSchema.enum.IN_PROGRESS && (
                <Button
                  type="submit"
                  variant="outline"
                  formAction={async () => {
                    'use server';
                    await MarkAsCompleteAction(lesson.id);
                  }}>
                  Complete
                </Button>
              )}
            {lesson.users.length !== 0 &&
              lesson.users[0].progress ===
                LessonProgressSchema.enum.COMPLETED && (
                <Button
                  type="submit"
                  variant="outline"
                  formAction={async () => {
                    'use server';
                    await MarkInProgressAction(lesson.id);
                  }}>
                  Mark in progress
                </Button>
              )}
          </form>
        </Group>
      </Stack>
    </Paper>
  );
};

export default Lesson;
