import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alexmercedai.com'),
  title: 'Alex Merced AI | Open Agentic AI Systems',
  description: 'Alex Merced’s work and advocacy across open agentic AI, including Merced AI, Loro, MagAgent, MagGraph, AGS, and OAP.',
  openGraph: { title: 'Alex Merced AI', description: 'Open components. Explicit contracts. Accountable agents.', url: 'https://alexmercedai.com', siteName: 'Alex Merced AI', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Alex Merced AI — open components, accountable agents' }] },
  twitter: { card: 'summary_large_image', title: 'Alex Merced AI', description: 'Open components. Explicit contracts. Accountable agents.', images: ['/og.png'] },
};

const structuredData = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Alex Merced AI', url: 'https://alexmercedai.com', author: { '@type': 'Person', name: 'Alex Merced', url: 'https://www.alexmerced.com' } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
