import type { MetadataRoute } from 'next';
import { articles } from './knowledge-base/_content';
import { contentDates } from './_lib/content-dates';

const base = 'https://alexmercedai.com';

// lastmod is the content date from git, never the build time.
function lastModified(...files: string[]): Date | undefined {
  const { modified } = contentDates(...files);
  return modified ? new Date(`${modified}T00:00:00Z`) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified: lastModified('app/page.tsx', 'app/_data/projects.ts'), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/knowledge-base`, lastModified: lastModified('app/knowledge-base/page.tsx'), changeFrequency: 'monthly', priority: 0.9 },
    ...articles.map((entry) => ({
      url: `${base}/knowledge-base/${entry.slug}`,
      lastModified: lastModified(`app/knowledge-base/_content/${entry.slug}.tsx`),
      changeFrequency: 'monthly' as const,
      priority: entry.kind === 'layer' ? 0.8 : 0.7,
    })),
  ];
}
