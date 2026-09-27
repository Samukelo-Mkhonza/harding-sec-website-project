import { useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const parse = (raw, fallback, type) => {
  if (raw === null) return fallback;
  const kind = type || (fallback === null ? 'string' : typeof fallback);
  if (kind === 'boolean') return raw === 'true' || raw === '1';
  if (kind === 'number') {
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }
  return raw;
};

const isDefault = (value, fallback) =>
  value === fallback || value === null || value === undefined || value === '';

/**
 * Keeps a flat filters object in the URL query string so filtered views
 * survive a refresh and can be shared as links. Only non-default values are
 * written, and updates replace the history entry rather than pushing one per
 * keystroke.
 *
 * @param {Object} defaults - filter keys and their default values
 * @param {Object} [types]  - optional { key: 'number' | 'boolean' | 'string' }
 *                            for keys whose default is null
 * @returns {[Object, Function]} [filters, setFilters] — setFilters accepts
 *   an object or an updater function, like useState.
 */
const useUrlFilters = (defaults, types = {}) => {
  const [params, setParams] = useSearchParams();
  // Defaults/types are usually inline literals; pin the first render's copy.
  const defaultsRef = useRef(defaults);
  const typesRef = useRef(types);

  const filters = useMemo(() => {
    const out = {};
    Object.entries(defaultsRef.current).forEach(([key, fallback]) => {
      out[key] = parse(params.get(key), fallback, typesRef.current[key]);
    });
    return out;
  }, [params]);

  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const setFilters = useCallback(
    (update) => {
      const next = typeof update === 'function' ? update(filtersRef.current) : update;
      filtersRef.current = next;
      setParams(
        (prev) => {
          const merged = new URLSearchParams(prev);
          Object.entries(defaultsRef.current).forEach(([key, fallback]) => {
            const value = next[key];
            if (isDefault(value, fallback)) merged.delete(key);
            else merged.set(key, String(value));
          });
          return merged;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  return [filters, setFilters];
};

export default useUrlFilters;
