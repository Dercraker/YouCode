'use client';

import useNotify from '@/hooks/useNotify';
import { logger } from '@/lib/logging/logger';
import { ErrorParams } from '@/types/next';
import { useEffect } from 'react';

const Error = ({ error }: ErrorParams) => {
  const { ErrorNotify } = useNotify();

  useEffect(() => {
    ErrorNotify({
      title: error.message,
      message:
        "Please sign in to access this page. If you don't have an account, you can create one for free.",
    });

    logger.error({
      message: error,
    });
  }, [error]);
};

export default Error;
