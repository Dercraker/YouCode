import { LessonsType } from '@/lib/Zod/admin/course/lessons/Lessons.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Group, Paper, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import AdminLessonSortable from './AdminLessonSortable';

interface LessonsListProps {
  lessons: LessonsType;
  courseId: string;
}
const AdminLessonsList = ({ lessons, courseId }: LessonsListProps) => {
  return (
    <Paper
      radius="lg"
      p="xl"
      withBorder
      my="md"
      mah="80vh"
      style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
      <Stack>
        <Group justify="space-between">
          <Title>Lessons . {lessons[0].course.name}</Title>
          <Button
            component={Link}
            href={LINKS.Admin.AdminNewLesson.href.replace('{1}', courseId)}>
            Create Lesson
          </Button>
        </Group>
        <Stack>
          <AdminLessonSortable lessons={lessons} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AdminLessonsList;
