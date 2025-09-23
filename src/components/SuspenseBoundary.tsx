import { getErrorMessage } from '@/utils/getErrorMessage';
import { ReactNode, Suspense } from 'react';
import { Button } from './ui/Button';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from './ui/Loader';

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <h2>오류가 발생했습니다.</h2>
      <p>{getErrorMessage(error)}</p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </div>
  );
}

export function SuspenseBoundary({ children, fallback = <Loader />, onReset }: SuspenseBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
