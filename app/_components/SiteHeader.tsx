import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link className="brand" href="/" aria-label="Alex Merced AI home"><span>AM</span><b>AlexMercedAI</b></Link>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#principles">Principles</Link>
        <Link href="/#books">Books</Link>
        <Link className="nav-cta" href="/knowledge-base">Knowledge base →</Link>
      </nav>
    </header>
  );
}
