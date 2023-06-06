import { ReactNode } from 'react';
import { UserProvider } from './UserContext';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <UserProvider>{children}</UserProvider>;
}
