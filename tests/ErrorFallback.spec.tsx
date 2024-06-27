import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorFallback, ErrorFallbackProps } from '@/ErrorFallback';

describe('ErrorFallback', () => {
  it('renders error message', () => {
    setup();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/There was an error:/)).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it('does not render reset button if canReset is false', () => {
    setup({ canReset: false });

    expect(
      screen.queryByRole('button', { name: /Try again/i })
    ).not.toBeInTheDocument();
  });

  it('renders reset button if canReset is true', () => {
    setup({ canReset: true });

    expect(
      screen.getByRole('button', { name: /Try again/i })
    ).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when reset button is clicked', async () => {
    const resetErrorBoundary = vi.fn();
    setup({ canReset: true, resetErrorBoundary });

    const button = screen.getByRole('button', { name: /Try again/i });
    await userEvent.click(button);

    expect(resetErrorBoundary).toHaveBeenCalled();
  });

  function setup(props: Partial<ErrorFallbackProps> = {}) {
    const defaultProps: ErrorFallbackProps = {
      canReset: false,
      error: new Error('Test error'),
      resetErrorBoundary: vi.fn(),
      ...props,
    };

    render(<ErrorFallback {...defaultProps} />);

    return {
      ...defaultProps,
    };
  }
});
