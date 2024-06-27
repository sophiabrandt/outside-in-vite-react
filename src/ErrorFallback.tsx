export interface ErrorFallbackProps {
  canReset: boolean;
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  canReset,
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      {canReset ? (
        <button
          data-testid="error-fallback-reset-button"
          onClick={resetErrorBoundary}>
          Try again
        </button>
      ) : null}
    </div>
  );
};
