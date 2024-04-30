import { NavigationLinksType } from '@/lib/Zod/NavigationLinks.schema';
import { NavigationLinksWithGroupType } from '@/lib/Zod/NavigationLinksWithGroup.schema';
import { IconHome } from '@tabler/icons-react';

export const HeaderLinks: NavigationLinksType = [
  {
    label: 'Home',
    href: '/',
    icon: <IconHome />,
    auth: false,
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: <IconHome />,
    auth: false,
  },
  {
    label: 'Contacts',
    href: '/contacts',
    icon: <IconHome />,
    auth: false,
  },
  {
    label: 'Support',
    href: '/support',
    icon: <IconHome />,
    auth: false,
  },
];

export const FooterLinks: NavigationLinksWithGroupType = [
  {
    title: 'About',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Forums', href: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Contribute', href: '#' },
      { label: 'Media assets', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Releases', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', href: '#' },
      { label: 'Follow on Twitter', href: '#' },
      { label: 'Email newsletter', href: '#' },
      { label: 'GitHub discussions', href: '#' },
    ],
  },
];
