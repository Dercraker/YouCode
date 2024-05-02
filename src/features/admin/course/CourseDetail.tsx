import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Image from 'next/image';

interface CourseDetailProps {
  course: any;
}

const CourseDetail = ({ course }: CourseDetailProps) => {
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
          <Text>{course._count.users} Users</Text>
          <Text>{course._count.lessons} Lessons</Text>
        </Stack>
        <Stack>
          <Button variant="outline">Edit</Button>
          <Button variant="outline">Edit Lessons</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CourseDetail;
