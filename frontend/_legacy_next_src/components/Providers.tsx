'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrandingProvider } from '../contexts/BrandingContext';
import { I18nProvider } from '../contexts/I18nContext';
import { FieldOpsDataProvider } from '../features/fieldops/store';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrandingProvider>
          <FieldOpsDataProvider>{children}</FieldOpsDataProvider>
        </BrandingProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
