import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  userPage: parseAsInteger.withDefault(1),
  lessonsPage: parseAsInteger.withDefault(1),
});
