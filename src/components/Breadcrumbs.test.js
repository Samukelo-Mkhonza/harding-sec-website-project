import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs, { buildTrail } from './Breadcrumbs';

const renderAt = (path, props) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Breadcrumbs {...props} />
    </MemoryRouter>
  );

describe('buildTrail', () => {
  it('returns nothing on the home page', () => {
    expect(buildTrail('/')).toEqual([]);
  });

  it('uses friendly labels for known routes and title-cases the rest', () => {
    expect(buildTrail('/student-portal/bursaries').map((c) => c.label)).toEqual([
      'Student Portal',
      'Bursary Finder',
    ]);
  });

  it('marks only the final crumb as current', () => {
    const trail = buildTrail('/student-life/clubs/debate');
    expect(trail.map((c) => c.isLast)).toEqual([false, false, true]);
  });

  it('lets custom labels override the defaults', () => {
    expect(buildTrail('/about', { '/about': 'Our School' })[0].label).toBe('Our School');
  });
});

describe('<Breadcrumbs />', () => {
  it('renders nothing on the home page', () => {
    const { container } = renderAt('/');
    expect(container).toBeEmptyDOMElement();
  });

  it('links to ancestors and marks the current page', () => {
    renderAt('/student-portal/timetable');
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Student Portal' })).toHaveAttribute('href', '/student-portal');
    expect(screen.getByText('Study Timetable')).toHaveAttribute('aria-current', 'page');
  });
});
