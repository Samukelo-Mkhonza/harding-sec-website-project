import React, { useMemo } from 'react';
import { List as VirtualList } from 'react-window';
import { motion } from 'framer-motion';
import { FiGrid, FiList } from 'react-icons/fi';
import PaperCard from './PaperCard';
import { PAPERS_PER_PAGE } from '../../utils/portalConstants';

const PapersList = ({
  papers,
  viewMode,
  onViewModeChange,
  isBookmarked,
  onDownload,
  onPreview,
  onBookmark,
  onDownloadMemo
}) => {
  const useVirtualScrolling = papers.length > PAPERS_PER_PAGE;

  // Sort options
  const [sortBy, setSortBy] = React.useState('date');
  const [sortOrder, setSortOrder] = React.useState('desc');

  const sortedPapers = useMemo(() => {
    const sorted = [...papers];
    sorted.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.uploadDate) - new Date(b.uploadDate);
          break;
        case 'subject':
          comparison = a.subject.localeCompare(b.subject);
          break;
        case 'grade':
          comparison = a.grade - b.grade;
          break;
        case 'year':
          comparison = a.year - b.year;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [papers, sortBy, sortOrder]);

  if (papers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No papers found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search query to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  // Virtual scrolling row renderer
  const Row = ({ index, style }) => {
    const paper = sortedPapers[index];
    return (
      <div style={style} className="px-2 py-2">
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
      {/* Results header with controls */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Results count and sort */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-gray-700">
              {papers.length} {papers.length === 1 ? 'paper' : 'papers'} found
            </span>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Sort papers by"
              >
                <option value="date">Upload Date</option>
                <option value="subject">Subject</option>
                <option value="grade">Grade</option>
                <option value="year">Year</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="text-sm px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Papers grid/list */}
      {useVirtualScrolling ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <VirtualList
            height={800}
            itemCount={sortedPapers.length}
            itemSize={viewMode === 'grid' ? 400 : 120}
            width="100%"
          >
            {Row}
          </VirtualList>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {sortedPapers.map((paper) => (
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
        </motion.div>
      )}
    </div>
  );
};

export default PapersList;
