import { SiteConfig } from '@/utils/site-config';
import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: SiteConfig.title,
    short_name: SiteConfig.title,
    description: SiteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
};

export default manifest;
