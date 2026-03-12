'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBranding } from '../contexts/BrandingContext';
import { primaryNavigation, secondaryNavigation } from '../features/fieldops/navigation';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { branding } = useBranding();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const isActiveRoute = useCallback(
    (href: string) => {
      if (!pathname) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!accountOpen) return;
      const target = event.target as Node | null;
      if (!target) return;
      if (accountRef.current && accountRef.current.contains(target)) return;
      setAccountOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [accountOpen]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const allNavigation = [...primaryNavigation, ...secondaryNavigation];
  const currentSection = allNavigation.find((item) => isActiveRoute(item.href));
  const currentDateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
      }).format(new Date()),
    [],
  );

  const accountItems = useMemo(
    () => [
      { href: '/account', label: 'My profile' },
      { href: '/account/company', label: 'Workspace' },
      { href: '/account/adjustments', label: 'Preferences' },
    ],
    [],
  );

  return (
    <div className="app-chassis">
      <div className="app-gradient-orb app-gradient-orb-left" />
      <div className="app-gradient-orb app-gradient-orb-right" />
      <div className="app-layout">
        <aside className="sidebar-panel">
          <div className="sidebar-brand">
            {branding.logoDataUrl ? (
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={branding.logoDataUrl} alt="Logo" className="h-full w-full object-contain p-1" />
              </div>
            ) : (
              <div className="brand-mark flex h-12 w-12 items-center justify-center rounded-2xl">
                <div className="text-center leading-[0.9]">
                  <div className="text-[12px] font-extrabold uppercase tracking-[0.18em]">K</div>
                  <div className="text-[10px] font-semibold">Ops</div>
                </div>
              </div>
            )}
            <div className="min-w-0">
              <p className="sidebar-brand-title">Keptos FieldOps</p>
              <p className="sidebar-brand-subtitle">
                {user?.tenantName || 'Premium service orchestration'}
              </p>
            </div>
          </div>

          <div className="sidebar-command-card">
            <div className="sidebar-command-meta">
              <span className="sidebar-command-dot" />
              <span>Command layer online</span>
            </div>
            <p className="sidebar-command-title">Field service operating system</p>
            <p className="sidebar-command-copy">
              Dispatch, on-site validation, reporting, and connector readiness in one premium control plane.
            </p>
          </div>

          <div className="mt-10">
            <p className="sidebar-label">Operations</p>
            <nav className="mt-3 space-y-2">
              {primaryNavigation.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link key={item.href} href={item.href} className={`nav-rail-item ${active ? 'nav-rail-item-active' : ''}`}>
                    <span className={`nav-rail-indicator ${active ? 'nav-rail-indicator-active' : ''}`} />
                    <span className="nav-rail-copy">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <span className="text-xs text-slate-400">{item.hint}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8">
            <p className="sidebar-label">Platform</p>
            <nav className="mt-3 space-y-2">
              {secondaryNavigation.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link key={item.href} href={item.href} className={`nav-rail-item ${active ? 'nav-rail-item-active' : ''}`}>
                    <span className={`nav-rail-indicator ${active ? 'nav-rail-indicator-active' : ''}`} />
                    <span className="nav-rail-copy">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <span className="text-xs text-slate-400">{item.hint}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="sidebar-architecture-card">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Roadmap-ready</p>
            <p className="mt-3 text-sm font-medium text-white">Supabase auth retained, connector layer scaffolded, PDF path reserved.</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The MVP runs with realistic demo data now, while the schema and server folders are aligned for Railway workers and multi-ITSM sync.
            </p>
            <div className="sidebar-architecture-grid">
              <span>Auth</span>
              <span>RLS</span>
              <span>PDF</span>
              <span>ITSM</span>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="topbar">
            <div className="topbar-copy">
              <div className="topbar-meta-row">
                <span className="chrome-chip">Secure workspace</span>
                <span className="topbar-date">{currentDateLabel}</span>
              </div>
              <p className="topbar-title">{currentSection ? currentSection.label : 'Field operations command center'}</p>
              <p className="topbar-subtitle">
                {currentSection ? `${currentSection.label} · ${currentSection.hint}` : 'Field operations command center'}
              </p>
            </div>
            <div className="topbar-actions">
              <span className="chrome-chip chrome-chip-muted">Enterprise mode</span>
              <Link href="/interventions/new" className="btn-primary">
                New intervention
              </Link>
              {user ? (
                <div className="relative" ref={accountRef}>
                  <button
                    type="button"
                    className="account-chip"
                    onClick={() => setAccountOpen((prev) => !prev)}
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                  >
                    <span className="account-avatar">{user.name.slice(0, 1).toUpperCase()}</span>
                    <span className="hidden text-left sm:block">
                      <span className="block text-sm font-medium text-white">{user.name}</span>
                      <span className="block text-xs text-slate-400">{user.email}</span>
                    </span>
                  </button>

                  {accountOpen ? (
                    <div className="app-menu absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border shadow-lg shadow-black/30" role="menu">
                      <div className="px-4 py-3">
                        <p className="text-sm font-semibold text-slate-100">{user.name}</p>
                        <p className="mt-1 text-xs text-slate-400">{user.email}</p>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="py-2">
                        {accountItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
                            role="menuitem"
                            onClick={() => setAccountOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="p-2">
                        <button
                          type="button"
                          className="w-full rounded-lg border border-red-500/30 px-3 py-2 text-left text-sm text-red-200 hover:bg-red-500/10"
                          onClick={handleLogout}
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link href="/login" className="btn-secondary">
                  Login
                </Link>
              )}
            </div>
          </header>

          <main className="app-main">
            <div className="content-shell">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
