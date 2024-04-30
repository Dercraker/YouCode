import { z } from 'zod';
import { NavigationLinkSchema } from './NavigationLink.schema';

export const NavigationLinksSchema = z.array(NavigationLinkSchema);

export type NavigationLinksType = z.infer<typeof NavigationLinksSchema>;
