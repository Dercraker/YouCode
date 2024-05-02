import PaginationComponent from '@/components/Pagination/Pagination';
import { LessonsType } from '@/lib/Zod/admin/course/lessons/Lessons.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Group, Paper, Stack, Title } from '@mantine/core';
import LessonListItem from './LessonListItem';

interface LessonsListProps {
  lessons: LessonsType;
  lessonsPage: number;
  totalLessons: number;
}
const LessonsList = ({
  lessons,
  lessonsPage,
  totalLessons,
}: LessonsListProps) => {
  return (
    <Paper radius="lg" p="xl" withBorder my="md">
      <Stack>
        <Group justify="space-between">
          <Title>Lessons . {lessons[0].course.name}</Title>
          <Button>Create Lesson</Button>
        </Group>
        <Stack>
          {lessons.map((lesson: any) => (
            <LessonListItem key={lesson.id} lesson={lesson} />
          ))}
        </Stack>
        <Group align="center" justify="center">
          <PaginationComponent
            baseUri={`${LINKS.Lessons.href.replace(
              '{1}',
              lessons[0].course.id,
            )}`}
            queryKey="lessonsPage"
            total={Math.ceil(totalLessons / 5)}
          />
        </Group>
      </Stack>
    </Paper>
  );
};

export default LessonsList;
