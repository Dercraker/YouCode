'use client';

import useNotify from '@/hooks/useNotify';
import { logger } from '@/lib/logging/logger';
import { ErrorParams } from '@/types/next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Error = ({ error }: ErrorParams) => {
  const { ErrorNotify } = useNotify();
  const router = useRouter();

  useEffect(() => {
    ErrorNotify({
      title: 'You are not authenticated',
      message:
        "Please sign in to access this page. If you don't have an account, you can create one for free.",
    });

    logger.error({
      message: error,
    });

    router.push('/auth/signin?callbackUrl=/courses');
  }, [error]);
};

export default Error;
