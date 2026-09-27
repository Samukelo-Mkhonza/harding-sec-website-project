import { renderHook, act } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import useUrlFilters from './useUrlFilters';

const setup = (initialUrl, defaults, types) => {
  let location;
  const wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[initialUrl]}>{children}</MemoryRouter>
  );
  const { result } = renderHook(
    () => {
      location = useLocation();
      return useUrlFilters(defaults, types);
    },
    { wrapper }
  );
  return { result, getSearch: () => location.search };
};

const DEFAULTS = { search: '', grade: null, kznOnly: false, type: 'all' };
const TYPES = { grade: 'number' };

describe('useUrlFilters', () => {
  it('returns defaults when the URL has no params', () => {
    const { result } = setup('/p', DEFAULTS, TYPES);
    expect(result.current[0]).toEqual(DEFAULTS);
  });

  it('parses typed values from the URL', () => {
    const { result } = setup('/p?search=nsfas&grade=12&kznOnly=true&type=corporate', DEFAULTS, TYPES);
    expect(result.current[0]).toEqual({ search: 'nsfas', grade: 12, kznOnly: true, type: 'corporate' });
  });

  it('falls back to the default for invalid numbers', () => {
    const { result } = setup('/p?grade=abc', DEFAULTS, TYPES);
    expect(result.current[0].grade).toBeNull();
  });

  it('writes only non-default values to the URL', () => {
    const { result, getSearch } = setup('/p', DEFAULTS, TYPES);
    act(() => result.current[1]({ ...DEFAULTS, grade: 11, search: 'maths' }));
    expect(getSearch()).toBe('?search=maths&grade=11');
    expect(result.current[0].grade).toBe(11);
  });

  it('supports updater functions and removes params reset to default', () => {
    const { result, getSearch } = setup('/p?type=corporate&search=x', DEFAULTS, TYPES);
    act(() => result.current[1]((f) => ({ ...f, type: 'all' })));
    expect(getSearch()).toBe('?search=x');
  });

  it('leaves unrelated params alone', () => {
    const { result, getSearch } = setup('/p?tab=tracker', DEFAULTS, TYPES);
    act(() => result.current[1]((f) => ({ ...f, kznOnly: true })));
    expect(getSearch()).toBe('?tab=tracker&kznOnly=true');
  });
});
