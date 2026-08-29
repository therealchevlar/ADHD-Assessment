import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/assessment', label: 'Assessment' },
  { to: '/criteria', label: 'Criteria' },
  { to: '/about', label: 'About' },
];

export function Header() {
  return (
    <header className="border-b border-ink/10 bg-paper/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-baseline gap-2 group">
          <span className="font-display text-lg font-semibold text-ink group-hover:text-verdigris-600 transition-colors">
            ADHD Assessment
          </span>
          <span className="hidden sm:inline font-mono-label text-[10px] uppercase text-ink-faint">
            Educational Simulator
          </span>
        </NavLink>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive ? 'text-verdigris-700 bg-verdigris-50' : 'text-ink-soft hover:text-ink hover:bg-ink/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
