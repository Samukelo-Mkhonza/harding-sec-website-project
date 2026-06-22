import React, { useMemo, useState } from 'react';
import { List as VirtualList } from 'react-window';
import { FaThLarge, FaList, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import PaperCard from './PaperCard';
import { PAPERS_PER_PAGE } from '../../utils/portalConstants';

const SORT_OPTIONS = [
  { value: 'date', label: 'Upload Date' },
  { value: 'year', label: 'Year' },
  { value: 'grade', label: 'Grade' },
  { value: 'subject', label: 'Subject' },
];

const PapersList = ({ papers, viewMode, onViewModeChange, isBookmarked, onDownload, onPreview, onBookmark, onDownloadMemo }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    const arr = [...papers];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') cmp = new Date(a.uploadDate) - new Date(b.uploadDate);
      else if (sortBy === 'year') cmp = a.year - b.year;
      else if (sortBy === 'grade') cmp = a.grade - b.grade;
      else if (sortBy === 'subject') cmp = a.subject.localeCompare(b.subject);
      return sortAsc ? cmp : -cmp;
    });
    return arr;
  }, [papers, sortBy, sortAsc]);

  if (papers.length === 0) {
    return (
      <div className="bg-white border border-neutral-100 rounded-2xl p-14 text-center shadow-sm">
        <div className="text-5xl mb-4">📄</div>
        <h3 className="text-lg font-heading font-bold text-neutral-700 mb-2">No papers found</h3>
        <p className="text-sm text-neutral-400">Adjust your filters or search to find what you need.</p>
      </div>
    );
  }

  const useVirtual = sorted.length > 500;

  const Row = ({ index, style }) => {
    const paper = sorted[index];
    return (
      <div style={style} className="px-1 py-1.5">
        <PaperCard
          paper={paper}
          viewMode={viewMode}
          isBookmarked={isBookmarked(paper.id)}
          onDownload={onDownload}
          onPreview={onPreview}
          onBookmark={onBookmark}
          onDownloadMemo={onDownloadMemo}
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls bar */}
      <div className="bg-white border border-neutral-100 rounded-2xl px-5 py-3.5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Count + sort */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-neutral-700">
            {papers.length} {papers.length === 1 ? 'paper' : 'papers'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              aria-label="Sort papers"
              className="text-xs border border-neutral-200 rounded-lg px-2 py-1.5 bg-white text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <button
              onClick={() => setSortAsc(a => !a)}
              aria-label={sortAsc ? 'Sort descending' : 'Sort ascending'}
              className="w-7 h-7 rounded-lg border border-neutral-200 text-neutral-500 hover:text-primary hover:border-primary/30 flex items-center justify-center transition-all"
            >
              {sortAsc ? <FaSortAmountUp className="text-xs" /> : <FaSortAmountDown className="text-xs" />}
            </button>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            aria-pressed={viewMode === 'grid'}
            aria-label="Grid view"
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-primary shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <FaThLarge className="text-sm" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            aria-pressed={viewMode === 'list'}
            aria-label="List view"
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white text-primary shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <FaList className="text-sm" />
          </button>
        </div>
      </div>

      {/* Papers */}
      {useVirtual ? (
        <div className="bg-white border border-neutral-100 rounded-2xl p-3 shadow-sm">
          <VirtualList
            height={800}
            itemCount={sorted.length}
            itemSize={viewMode === 'grid' ? 420 : 90}
            width="100%"
          >
            {Row}
          </VirtualList>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
          {sorted.map(paper => (
            <PaperCard
              key={paper.id}
              paper={paper}
              viewMode={viewMode}
              isBookmarked={isBookmarked(paper.id)}
              onDownload={onDownload}
              onPreview={onPreview}
              onBookmark={onBookmark}
              onDownloadMemo={onDownloadMemo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PapersList;
