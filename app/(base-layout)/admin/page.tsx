import NewUserStatsLoader from '@/components/loader/admin/NewUserStats.loader';
import QuickStatsLoader from '@/components/loader/admin/QuickStats.loader';
import NewUserStats from '@/features/admin/NewUserStats';
import QuickStats from '@/features/admin/QuickStats';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Container, Divider, Group, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';

const RoutePage = () => {
  return (
    <Container size="xl">
      <Stack>
        <Group justify="space-between">
          <Title>Dashboard</Title>
          <Button
            variant="outline"
            component={Link}
            href={LINKS.Admin.AdminCourses.href}>
            Course
          </Button>
        </Group>
        <Divider mb="xl" />

        <Suspense fallback={<QuickStatsLoader />}>
          <QuickStats />
        </Suspense>
        <Suspense fallback={<NewUserStatsLoader />}>
          <NewUserStats />
        </Suspense>
      </Stack>
    </Container>
  );
};

export default RoutePage;
