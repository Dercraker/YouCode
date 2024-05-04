import AvatarImage from '@/components/ui/Avatar';
import { CourseType } from '@/lib/Zod/explorer/Course.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { AspectRatio, Group, Paper, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CourseListItem.module.css';

interface CourseListItemProps {
  course: CourseType;
}

const CourseListItem = ({ course }: CourseListItemProps) => {
  return (
    <Paper
      radius="lg"
      shadow="xl"
      p="xl"
      withBorder
      w="30em"
      h="10em"
      component={Link}
      href={LINKS.Course.href.replace('{1}', course.id)}
      className={styles.paper}>
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
              <Text c="dimmed">
                {course.creator.name ||
                  course.creator.email.split('@')[0] ||
                  'Unknown User'}
              </Text>
            </Group>
          </Stack>
        </Group>
      </Group>
    </Paper>
  );
};

export default CourseListItem;
