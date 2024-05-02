import CourseDetail from '@/features/admin/course/CourseDetail';
import UserList from '@/features/admin/course/UserList';
import { requiredAuth } from '@/lib/auth/helper';
import { searchParamsCache } from '@/lib/nusq/searchParams';
import { courseQuery } from '@/lib/prisma/admin/courses/course.query';
import { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Group,
  Stack,
} from '@mantine/core';
import { IconSlash } from '@tabler/icons-react';
import Link from 'next/link';

type RoutePageProps = {
  slug: string;
};

const RoutePage = async ({
  params: { slug },
  searchParams,
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const { userPage } = searchParamsCache.parse(searchParams);

  const course = await courseQuery({
    id: slug,
    ownerId: user.id,
    take: 5,
    skip: userPage,
  });

  const items = [
    { title: LINKS.Courses.label, href: LINKS.Courses.href },
    {
      title: course.name,
      href: `${LINKS.Courses.href}/${course.id}?userPage=${userPage}`,
    },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <Container>
      <Stack>
        <Box>
          <Group justify="space-between">
            <Breadcrumbs separator={<IconSlash />} separatorMargin={0}>
              {items}
            </Breadcrumbs>
          </Group>
          <Divider />
        </Box>
        <Group align="top">
          <UserList
            slug={slug}
            users={course?.users ?? []}
            userCount={course._count?.users ?? 0}
          />
          <CourseDetail course={course} />
        </Group>
      </Stack>
    </Container>
  );
};

export default RoutePage;
