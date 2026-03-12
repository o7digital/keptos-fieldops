'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4 text-slate-300">Loading workspace form...</div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}

function RegisterPageContent() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const inviteTenantId = (searchParams.get('tenantId') || '').trim();
  const inviteTenantName = (searchParams.get('tenantName') || '').trim();
  const inviteName = (searchParams.get('name') || '').trim();
  const inviteEmail = (searchParams.get('email') || '').trim();
  const inviteToken = (searchParams.get('inviteToken') || '').trim();
  const isInvite = Boolean(inviteTenantId);

  const [tenantName, setTenantName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isInvite) return;
    setTenantName(inviteTenantName || tenantName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteTenantId, inviteTenantName, isInvite]);

  useEffect(() => {
    if (!isInvite) return;
    if (inviteName) setName((prev) => prev || inviteName);
    if (inviteEmail) setEmail((prev) => prev || inviteEmail);
  }, [inviteEmail, inviteName, isInvite]);

  const tenantNameDisabled = useMemo(() => isInvite && Boolean(inviteTenantName), [inviteTenantName, isInvite]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const result = await register({
        tenantId: inviteTenantId || undefined,
        tenantName,
        name,
        email,
        password,
        inviteToken: inviteToken || undefined,
      });
      if (result === 'confirm') {
        setInfo('Check your email to confirm the workspace access.');
        return;
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to register';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="app-gradient-orb app-gradient-orb-left" />
      <div className="app-gradient-orb app-gradient-orb-right" />
      <div className="auth-card grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-white/6 p-8 lg:border-b-0 lg:border-r lg:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Workspace bootstrap</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
            Create a new Keptos FieldOps workspace without breaking the future integration path.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            The auth and role foundations remain compatible with Supabase today and the broader connector strategy for Railway workers later.
          </p>
        </div>

        <div className="p-8 lg:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Provisioning</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Create workspace access</h2>
          <p className="mt-3 text-sm text-slate-400">This keeps the existing auth base while rebranding the product around Keptos operations.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="field-label">Workspace name</label>
              <input
                className="field-control mt-2"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                required
                disabled={tenantNameDisabled}
              />
              {isInvite ? <p className="mt-2 text-sm text-slate-500">Joining an invited workspace.</p> : null}
            </div>
            <div>
              <label className="field-label">Your name</label>
              <input className="field-control mt-2" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
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
            {info ? <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{info}</div> : null}
            {error ? <div className="rounded-2xl bg-red-500/15 px-4 py-3 text-sm text-red-200">{error}</div> : null}
            <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
              {loading ? 'Creating workspace...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Already have access?{' '}
            <Link href="/login" className="font-medium text-cyan-200 transition hover:text-cyan-100">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
