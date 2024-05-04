import CoursesTable from '@/features/admin/CoursesTable';
import { requiredAuth } from '@/lib/auth/helper';
import { LINKS } from '@/utils/NavigationLinks';
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import Link from 'next/link';

const RoutePage = async () => {
  const user = await requiredAuth();

  return (
    <Container>
      <Stack>
        <Box>
          <Group justify="space-between">
            <Title>Courses</Title>
            <Button component={Link} href={LINKS.Admin.AdminNewCourse.href}>
              {LINKS.Admin.AdminNewCourse.label}
            </Button>
          </Group>
          <Divider />
        </Box>
        <CoursesTable user={user} />
      </Stack>
    </Container>
  );
};

export default RoutePage;
