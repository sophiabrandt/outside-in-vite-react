import { ErrorFallback } from '@/ErrorFallback';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface ErrorBoundaryWithResetProps {
  onReset?: () => void;
  resetKeys?: Array<unknown>;
  children: React.ReactNode;
}

export const ErrorBoundaryWithReset = ({
  onReset,
  resetKeys,
  children,
}: ErrorBoundaryWithResetProps) => {
  const canReset = Boolean(onReset || resetKeys);
  return (
    <ErrorBoundary
      fallbackRender={(props: FallbackProps) => (
        <ErrorFallback canReset={canReset} {...props} />
      )}
      onReset={onReset}
      resetKeys={resetKeys}>
      {children}
    </ErrorBoundary>
  );
};
