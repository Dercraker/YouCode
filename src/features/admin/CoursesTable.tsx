'use client';

import { CoursesByOwnerIdGETAction } from '@/lib/server-actions/admin/CoursesByOwnerIdGET.action';
import { LINKS } from '@/utils/NavigationLinks';
import { AspectRatio, Skeleton, Table, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { User } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CoursesTable.module.css';

interface CoursesTableProps {
  user: User;
}
const CoursesTable = ({ user }: CoursesTableProps) => {
  const { data: courses, isPending: fetchCourses } = useQuery({
    queryKey: ['Courses', user.id],
    queryFn: async () => await CoursesByOwnerIdGETAction(null),
    enabled: !!user.id,
  });

  const router = useRouter();

  const handleClickCours = (id: string) => {
    router.push(`${LINKS.Courses.href}/${id}`);
  };

  const rows = courses?.data?.map(cours => (
    <Table.Tr
      key={cours.id}
      onClick={() => handleClickCours(cours.id)}
      className={styles.row}>
      <Table.Td>
        <AspectRatio ratio={1}>
          <Image
            src={cours.image}
            alt={cours.name}
            width={5}
            height={5}
            layout="responsive"
          />
        </AspectRatio>
      </Table.Td>
      <Table.Td>
        <Title>{cours.name}</Title>
      </Table.Td>
      <Table.Td>{moment(cours.createdAt).format('YYYY/MM/DD')}</Table.Td>
    </Table.Tr>
  ));

  if (fetchCourses) {
    return <Skeleton height="50vh" mb="xl" />;
  }

  return (
    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Image</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default CoursesTable;
