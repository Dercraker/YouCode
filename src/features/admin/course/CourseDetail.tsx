import { AspectRatio, Group, Paper, Stack, Text } from '@mantine/core';
import Image from 'next/image';

interface CourseDetailProps {
  course: any;
}

const CourseDetail = ({ course }: CourseDetailProps) => {
  return (
    <Paper radius="lg" p="xl" withBorder my="md" style={{ flexGrow: 1 }}>
      <Stack>
        <Group>
          <AspectRatio ratio={1}>
            <Image
              src={course.image}
              alt={course.name}
              width={5}
              height={5}
              layout="responsive"
            />
          </AspectRatio>
          <Text>{course.name}</Text>
        </Group>
        <Stack>
          <Text>{course._count.users} Users</Text>
          <Text>{course._count.lessons} Lessons</Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CourseDetail;
