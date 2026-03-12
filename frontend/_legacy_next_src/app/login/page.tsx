'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { login, token } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) router.replace('/dashboard');
  }, [token, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to login';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="app-gradient-orb app-gradient-orb-left" />
      <div className="app-gradient-orb app-gradient-orb-right" />
      <div className="auth-card grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/6 p-8 lg:border-b-0 lg:border-r lg:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Keptos FieldOps</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white">
            Premium field service orchestration for operations, interventions, and reporting.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            Command center for clients, sites, engineers, check-ins, reports, internet quality, and future ITSM connectors.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="panel">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Clients</p>
              <p className="mt-3 text-2xl font-semibold text-white">360°</p>
              <p className="mt-2 text-sm text-slate-400">Operational accounts, SLAs, and active sites.</p>
            </div>
            <div className="panel">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Interventions</p>
              <p className="mt-3 text-2xl font-semibold text-white">Live</p>
              <p className="mt-2 text-sm text-slate-400">Dispatch, check-in, check-out, and reporting.</p>
            </div>
            <div className="panel">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Connectors</p>
              <p className="mt-3 text-2xl font-semibold text-white">Ready</p>
              <p className="mt-2 text-sm text-slate-400">Zendesk, JSM, ServiceNow, and Freshservice path.</p>
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Workspace access</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Sign in to command layer</h2>
          <p className="mt-3 text-sm text-slate-400">Use Supabase credentials to access the Keptos FieldOps MVP.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="field-label">Email</label>
              <input
                className="field-control mt-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input
                className="field-control mt-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? <div className="rounded-2xl bg-red-500/12 px-4 py-3 text-sm text-red-200">{error}</div> : null}
            <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Need a new workspace?{' '}
            <Link href="/register" className="font-medium text-cyan-200 transition hover:text-cyan-100">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
