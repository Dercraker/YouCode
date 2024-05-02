import AvatarImage from '@/components/ui/Avatar';
import { CourseBySlugType } from '@/lib/Zod/course/CourseBySlug.schema';
import { ServerMdx } from '@/lib/markdown/ServerMdx';
import { AspectRatio, Group, Paper, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';

interface CourseDetailProps {
  course: CourseBySlugType;
}

const CourseDetail = ({ course }: CourseDetailProps) => (
  <Paper radius="lg" shadow="xl" p="xl" withBorder flex={2}>
    <Stack>
      <Group
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}>
        <AspectRatio ratio={1} w={100}>
          <Image src={course.image} alt={course.name} fill />
        </AspectRatio>
        <Group>
          <Stack>
            <Text
              fw={700}
              style={{ fontSize: '20px' }}
              maw="14em"
              truncate="end">
              {course.name}
            </Text>
            <Group>
              <AvatarImage user={course.creator} />
              <Text c="dimmed">{course.creator.name || 'Unknown User'}</Text>
            </Group>
          </Stack>
        </Group>
      </Group>
      <Group>
        <Title>{course.name}</Title>
        <ServerMdx source={course.presentation} />
      </Group>
    </Stack>
  </Paper>
);

export default CourseDetail;
