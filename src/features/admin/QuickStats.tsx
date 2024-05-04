import { requiredAuth } from '@/lib/auth/helper';
import { prisma } from '@/lib/prisma/prisma';
import { Group, Paper, Space, Stack, Text, Title } from '@mantine/core';
import { IconBook, IconBook2, IconUsers } from '@tabler/icons-react';

const QuickStats = async () => {
  const user = await requiredAuth();

  const users = await prisma.user.count({
    where: {
      ownedCourses: {
        some: {
          course: {
            creatorId: user.id,
          },
        },
      },
    },
  });

  const lessons = await prisma.lesson.count({
    where: {
      course: {
        creatorId: user.id,
      },
    },
  });

  const courses = await prisma.course.count({
    where: {
      creatorId: user.id,
    },
  });

  return (
    <Paper shadow="xl" p="xl" withBorder>
      <Stack>
        <Title>Quick Stats</Title>

        <Space h="xs" />

        <Stack>
          <Group>
            <IconBook2 />
            <Text>{courses} Courses</Text>
          </Group>
          <Group>
            <IconBook />
            <Text>{lessons} Lessons</Text>
          </Group>
          <Group>
            <IconUsers />
            <Text>{users} Students</Text>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuickStats;
