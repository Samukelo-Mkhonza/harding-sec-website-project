import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiEye, FiBookmark, FiFileText, FiCalendar, FiLayers } from 'react-icons/fi';
import { getSubjectById, getExamTypeById, NEW_BADGE_DAYS } from '../../utils/portalConstants';
import { isNewPaper } from '../../utils/filterUtils';

const PaperCard = ({
  paper,
  viewMode = 'grid',
  isBookmarked = false,
  onDownload,
  onPreview,
  onBookmark,
  onDownloadMemo
}) => {
  const subject = getSubjectById(paper.subject);
  const examType = getExamTypeById(paper.examType);
  const isNew = isNewPaper(paper.uploadDate, NEW_BADGE_DAYS);
  const hasMemo = paper.memoUrl !== null;

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Paper Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: subject?.color }}
                aria-label={`${subject?.name} indicator`}
              />
              <h3 className="font-semibold text-gray-800 truncate">{paper.title}</h3>
              {isNew && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex-shrink-0">
                  New
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiLayers className="w-4 h-4" />
                Grade {paper.grade}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                {paper.year} - {examType?.shortName}
              </span>
              <span className="flex items-center gap-1">
                <FiFileText className="w-4 h-4" />
                {formatFileSize(paper.fileSize)}
              </span>
              {hasMemo ? (
                <span className="text-primary flex items-center gap-1">
                  <FiFileText className="w-4 h-4" />
                  Memo available
                </span>
              ) : (
                <span className="text-gray-400">Memo not available</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onPreview(paper)}
              className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              aria-label={`Preview ${paper.title}`}
              title="Preview"
            >
              <FiEye className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDownload(paper)}
              className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              aria-label={`Download ${paper.title}`}
              title="Download"
            >
              <FiDownload className="w-5 h-5" />
            </button>
            {hasMemo && (
              <button
                onClick={() => onDownloadMemo(paper)}
                className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                aria-label={`Download memo for ${paper.title}`}
                title="Download Memo"
              >
                <FiFileText className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => onBookmark(paper.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-600 hover:text-primary hover:bg-primary/10'
              }`}
              aria-label={isBookmarked ? `Remove ${paper.title} from bookmarks` : `Bookmark ${paper.title}`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Header with subject color */}
      <div
        className="h-2"
        style={{ backgroundColor: subject?.color }}
        aria-label={`${subject?.name} indicator`}
      />

      <div className="p-4">
        {/* Title and badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1">{paper.title}</h3>
          {isNew && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex-shrink-0">
              New
            </span>
          )}
        </div>

        {/* Paper details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiLayers className="w-4 h-4 flex-shrink-0" />
            <span>Grade {paper.grade}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4 flex-shrink-0" />
            <span>{paper.year} - {examType?.shortName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiFileText className="w-4 h-4 flex-shrink-0" />
            <span>{formatFileSize(paper.fileSize)} • {paper.pageCount} pages</span>
          </div>
        </div>

        {/* Memo status */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          {hasMemo ? (
            <span className="text-sm text-primary flex items-center gap-1">
              <FiFileText className="w-4 h-4" />
              Marking Memo available
            </span>
          ) : (
            <span className="text-sm text-gray-400">Memo not available</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onPreview(paper)}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label={`Preview ${paper.title}`}
            >
              <FiEye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => onDownload(paper)}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              aria-label={`Download ${paper.title}`}
            >
              <FiDownload className="w-4 h-4" />
              Download
            </button>
          </div>

          {hasMemo && (
            <button
              onClick={() => onDownloadMemo(paper)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              aria-label={`Download memo for ${paper.title}`}
            >
              <FiFileText className="w-4 h-4" />
              Download Memo
            </button>
          )}

          <button
            onClick={() => onBookmark(paper.id)}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              isBookmarked
                ? 'bg-primary/10 text-primary border border-primary'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            aria-label={isBookmarked ? `Remove ${paper.title} from bookmarks` : `Bookmark ${paper.title}`}
          >
            <FiBookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard;
