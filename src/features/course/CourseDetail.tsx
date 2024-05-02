import AvatarImage from '@/components/ui/Avatar';
import { CourseBySlugType } from '@/lib/Zod/course/CourseBySlug.schema';
import { AspectRatio, Group, Paper, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import MarkdownProse from '../mdx/MarkdownProse';

interface CourseDetailProps {
  course: CourseBySlugType;
}

const CourseDetail = ({ course }: CourseDetailProps) => {
  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

  return (
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
          <MarkdownProse markdown={course.presentation} />
        </Group>
      </Stack>
    </Paper>
  );
};

export default CourseDetail;
