import { z } from 'zod';
import { NavigationLinkWithGroupSchema } from './NavigationLinkWithGroup.schema';

export const NavigationLinksWithGroupSchema = z.array(
  NavigationLinkWithGroupSchema,
);

export type NavigationLinksWithGroupType = z.infer<
  typeof NavigationLinksWithGroupSchema
>;
