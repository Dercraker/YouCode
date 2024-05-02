import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  userPage: parseAsInteger.withDefault(1),
  maxResults: parseAsInteger.withDefault(10),
});
