'use client';

import { Pagination } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

interface PaginationComponentProps {
  baseUri: string;
  queryKey: string;
  total: number;
}

const PaginationComponent = ({
  baseUri,
  queryKey,
  total,
}: PaginationComponentProps) => {
  const router = useRouter();

  const [page] = useQueryState(queryKey, parseAsInteger.withDefault(1));

  const handleChange = (value: number) =>
    router.push(`${baseUri}?${queryKey}=${value}`);

  return (
    <Pagination
      total={total}
      radius="md"
      value={page}
      onChange={handleChange}
      withEdges
    />
  );
};

export default PaginationComponent;
