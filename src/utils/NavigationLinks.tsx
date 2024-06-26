import { NavigationLinksType } from '@/lib/Zod/NavigationLinks.schema';
import { NavigationLinksWithGroupType } from '@/lib/Zod/NavigationLinksWithGroup.schema';
import {
  IconBooks,
  IconCertificate2,
  IconHome,
  IconSettings,
} from '@tabler/icons-react';

export const LINKS = {
  Home: {
    label: 'Home',
    href: '/',
    icon: <IconHome />,
  },
  Account: {
    DashBoard: {
      label: 'Account',
      href: '/account',
      icon: <IconHome />,
      auth: true,
    },
    Settings: {
      label: 'Account Settings',
      href: '/account/settings',
      icon: <IconSettings />,
      auth: true,
    },
  },
  Admin: {
    Admin: {
      label: 'Admin',
      href: '/admin',
      auth: true,
    },
    AdminCourses: {
      label: 'Courses',
      href: '/admin/courses',
      auth: true,
    },
    AdminCourse: {
      label: 'Course',
      href: '/admin/courses/{1}',
      auth: true,
    },
    AdminEditCourse: {
      label: 'Edit Course',
      href: '/admin/courses/{1}/edit',
      auth: true,
    },
    AdminNewCourse: {
      label: 'New Course',
      href: '/admin/courses/new',
      auth: true,
    },
    AdminLessons: {
      label: 'Lessons',
      href: '/admin/courses/{1}/lessons',
      auth: true,
    },
    AdminLesson: {
      label: 'Lesson',
      href: '/admin/courses/{1}/lessons/{2}',
      auth: true,
    },
    AdminEditLesson: {
      label: 'Edit Lesson',
      href: '/admin/courses/{1}/lessons/{2}/edit',
      auth: true,
    },
    AdminNewLesson: {
      label: 'New Lesson',
      href: '/admin/courses/{1}/lessons/new',
      auth: true,
    },
  },

  Course: {
    label: 'Course',
    href: '/courses/{1}',
  },

  Lesson: {
    label: 'Lesson',
    href: '/courses/{1}/lessons/{2}',
  },
  Explorer: {
    label: 'Explorer',
    icon: <IconBooks />,
    href: '/explorer',
  },
  MyCourses: {
    label: 'My Courses',
    href: '/courses',
    icon: <IconCertificate2 />,
    auth: true,
  },
};

export const HeaderLinks: NavigationLinksType = [
  LINKS.Home,
  LINKS.Explorer,
  LINKS.MyCourses,
];

export const FooterLinks: NavigationLinksWithGroupType = [
  {
    title: 'About',
    links: [
      LINKS.Explorer,
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
