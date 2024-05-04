import { CourseStateSchema } from '@/lib/Zod/admin/course/CourseState.schema';
import { LINKS } from '@/utils/NavigationLinks';
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Image from 'next/image';

interface AdminCourseDetailProps {
  course: any;
}

const AdminCourseDetail = ({ course }: AdminCourseDetailProps) => {
  return (
    <Paper radius="lg" p="xl" withBorder my="md" style={{ flexGrow: 1 }}>
      <Stack>
        <Box>
          <AspectRatio ratio={1}>
            <Image
              src={course.image}
              alt={course.name}
              width={5}
              height={5}
              layout="responsive"
            />
          </AspectRatio>
          <Title ta="center">{course.name}</Title>
          <Divider my="xs" />
        </Box>
        <Stack gap="0">
          <Badge
            color={
              course.state === CourseStateSchema.enum.DRAFT ? 'red' : 'teal'
            }>
            {course.state}
          </Badge>
          <Text>{course._count.users} Users</Text>
          <Text>{course._count.lessons} Lessons</Text>
        </Stack>
        <Stack>
          <Button
            variant="outline"
            component="a"
            href={`${LINKS.Admin.AdminEditCourse.href.replace(
              '{1}',
              course.id,
            )}`}>
            Edit
          </Button>
          <Button
            variant="outline"
            component="a"
            href={`${LINKS.Admin.AdminLessons.href.replace(
              '{1}',
              course.id,
            )}?lessonsPage=1`}>
            Edit Lessons
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AdminCourseDetail;
