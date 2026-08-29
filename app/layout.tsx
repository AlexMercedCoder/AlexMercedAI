import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alexmercedai.com'),
  title: { default: 'Alex Merced AI | Open Agentic AI Systems', template: '%s | Alex Merced AI' },
  description: 'Alex Merced’s work and advocacy across open agentic AI, including Merced AI, Loro, MagAgent, MagGraph, AGS, and OAP.',
  applicationName: 'Alex Merced AI',
  authors: [{ name: 'Alex Merced', url: 'https://www.alexmerced.com' }],
  creator: 'Alex Merced',
  publisher: 'Alex Merced',
  category: 'technology',
  keywords: ['Alex Merced', 'agentic AI', 'open source AI', 'Merced AI', 'Loro', 'MagAgent', 'MagGraph', 'AGS', 'OAP'],
  alternates: { canonical: '/', types: { 'text/plain': '/llms.txt' } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  referrer: 'origin-when-cross-origin',
  openGraph: { title: 'Alex Merced AI', description: 'Open components. Explicit contracts. Accountable agents.', url: 'https://alexmercedai.com', siteName: 'Alex Merced AI', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Alex Merced AI: open components, accountable agents' }] },
  twitter: { card: 'summary_large_image', title: 'Alex Merced AI', description: 'Open components. Explicit contracts. Accountable agents.', images: ['/og.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f4f0e8', colorScheme: 'light' };

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://alexmercedai.com/#website', name: 'Alex Merced AI', url: 'https://alexmercedai.com/', description: 'Alex Merced’s work and advocacy across open agentic AI.', inLanguage: 'en-US', author: { '@id': 'https://alexmercedai.com/#alex-merced' } },
    { '@type': 'Person', '@id': 'https://alexmercedai.com/#alex-merced', name: 'Alex Merced', url: 'https://www.alexmerced.com', sameAs: ['https://github.com/AlexMercedCoder', 'https://www.alexmerceddata.com', 'https://www.alexmercedcoder.dev'], knowsAbout: ['Agentic AI', 'Data infrastructure', 'Open standards', 'Developer education'] },
    { '@type': 'ItemList', '@id': 'https://alexmercedai.com/#projects', name: 'Alex Merced open agentic AI projects', itemListElement: ['Merced AI', 'Loro', 'MagAgent', 'MagGraph'].map((name, index) => ({ '@type': 'ListItem', position: index + 1, name })) },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
