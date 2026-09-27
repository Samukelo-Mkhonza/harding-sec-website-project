import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  Button, Card, Badge, Section, Container, SectionHeader, PageHero,
  LoadingState, ErrorState, EmptyState, cx,
} from './index';

const withRouter = (ui, path = '/') => render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

describe('cx', () => {
  it('drops falsy values', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b');
  });
});

describe('Button', () => {
  it('renders a button with type="button" by default', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('renders a router link when given `to`', () => {
    withRouter(<Button to="/contact">Contact</Button>);
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('opens external hrefs in a new tab safely', () => {
    render(<Button href="https://example.org">Out</Button>);
    const link = screen.getByRole('link', { name: 'Out' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target to tel/mailto links', () => {
    render(<Button href="tel:0394331223">Call</Button>);
    expect(screen.getByRole('link', { name: 'Call' })).not.toHaveAttribute('target');
  });

  it('applies variant classes and forwards clicks', () => {
    const onClick = jest.fn();
    render(<Button variant="outline" onClick={onClick}>Go</Button>);
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn.className).toMatch(/border-primary/);
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Card / Badge / Section', () => {
  it('Card renders as the requested element', () => {
    render(<Card as="article" interactive>Body</Card>);
    expect(screen.getByRole('article')).toHaveTextContent('Body');
  });

  it('Badge renders its tone', () => {
    render(<Badge tone="danger">Closed</Badge>);
    expect(screen.getByText('Closed').className).toMatch(/bg-red-100/);
  });

  it('Section wraps content in the shared container', () => {
    render(<Section tone="muted" data-testid="s">X</Section>);
    expect(screen.getByTestId('s').className).toMatch(/bg-neutral-50/);
    expect(screen.getByText('X').className).toMatch(/container-custom/);
  });

  it('Container supports a narrow width', () => {
    render(<Container narrow>X</Container>);
    expect(screen.getByText('X').className).toMatch(/max-w-4xl/);
  });
});

describe('SectionHeader', () => {
  it('renders eyebrow, heading and description', () => {
    render(<SectionHeader eyebrow="Our Story" title="History" description="Since 1950" />);
    expect(screen.getByText('Our Story')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'History' })).toBeInTheDocument();
    expect(screen.getByText('Since 1950')).toBeInTheDocument();
  });

  it('renders an action when left-aligned', () => {
    render(<SectionHeader align="left" title="News" action={<a href="/news">All news</a>} />);
    expect(screen.getByRole('link', { name: 'All news' })).toBeInTheDocument();
  });
});

describe('PageHero', () => {
  it('renders a single h1, breadcrumbs and stats', () => {
    withRouter(
      <PageHero
        eyebrow="Study Resources"
        title="Past Papers"
        description="Browse papers"
        stats={[{ label: 'Subjects', value: '11' }]}
      />,
      '/past-papers'
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('can hide breadcrumbs', () => {
    withRouter(<PageHero title="Home" breadcrumbs={false} />, '/about');
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('uses a decorative background image', () => {
    withRouter(<PageHero title="T" image="/x.jpg" />, '/about');
    const img = screen.getByRole('presentation', { hidden: true });
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('States', () => {
  it('LoadingState is announced politely', () => {
    render(<LoadingState label="Loading papers…" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading papers…');
  });

  it('ErrorState calls onRetry', () => {
    const onRetry = jest.fn();
    render(<ErrorState message="Failed" onRetry={onRetry} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalled();
  });

  it('EmptyState shows title, message and action', () => {
    render(<EmptyState title="Nothing here" message="Try another filter" action={<button>Reset</button>} />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Try another filter')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });
});
