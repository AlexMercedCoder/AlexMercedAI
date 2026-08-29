import Link from 'next/link';
import { MobileNav, type NavItem } from './MobileNav';

const navItems: NavItem[] = [
  { label: 'Selected work', href: '/#work' },
  { label: 'Knowledge base', href: '/knowledge-base' },
  { label: 'Open contracts', href: '/#standards' },
  { label: 'Principles', href: '/#principles' },
  { label: 'Books', href: '/#books' },
  { label: 'About Alex', href: '/#about' },
  { label: 'Newsletter', href: '/#newsletter' },
  { label: 'GitHub', href: 'https://github.com/AlexMercedCoder', external: true },
];

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link className="brand" href="/" aria-label="Alex Merced AI home"><span>AM</span><b>AlexMercedAI</b></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/knowledge-base">Knowledge base</Link>
        <Link href="/#principles">Principles</Link>
        <Link href="/#books">Books</Link>
        <a className="nav-cta" href="https://github.com/AlexMercedCoder" rel="noopener">GitHub ↗</a>
      </nav>
      <MobileNav items={navItems} />
    </header>
  );
}
