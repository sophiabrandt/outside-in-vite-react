import { ErrorBoundaryWithReset } from '@/ErrorBoundaryWithReset';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock component to trigger an error
const Bomb = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Boom!');
  }
  return <div>All good</div>;
};

describe('ErrorBoundaryWithReset', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});

  it('renders fallback when error is thrown', () => {
    render(
      <ErrorBoundaryWithReset>
        <Bomb shouldThrow={true} />
      </ErrorBoundaryWithReset>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Boom!/)).toBeInTheDocument();
  });

  it('does not render fallback when no error is thrown', () => {
    render(
      <ErrorBoundaryWithReset>
        <Bomb shouldThrow={false} />
      </ErrorBoundaryWithReset>
    );

    expect(screen.getByText(/All good/)).toBeInTheDocument();
  });

  it('resets error boundary when reset button is clicked', async () => {
    const onReset = vi.fn();
    render(
      <ErrorBoundaryWithReset onReset={onReset}>
        <Bomb shouldThrow={true} />
      </ErrorBoundaryWithReset>
    );

    const button = screen.getByRole('button', { name: /Try again/i });
    await userEvent.click(button);

    expect(onReset).toHaveBeenCalled();
  });

  it('does not render reset button if canReset is false', () => {
    render(
      <ErrorBoundaryWithReset>
        <Bomb shouldThrow={true} />
      </ErrorBoundaryWithReset>
    );

    expect(
      screen.queryByRole('button', { name: /Try again/i })
    ).not.toBeInTheDocument();
  });

  it('renders reset button if canReset is true', () => {
    render(
      <ErrorBoundaryWithReset resetKeys={[1]}>
        <Bomb shouldThrow={true} />
      </ErrorBoundaryWithReset>
    );

    expect(
      screen.getByRole('button', { name: /Try again/i })
    ).toBeInTheDocument();
  });
});
