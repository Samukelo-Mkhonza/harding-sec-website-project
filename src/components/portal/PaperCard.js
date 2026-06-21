import React from 'react';
import { FaDownload, FaEye, FaBookmark, FaRegBookmark, FaFileAlt, FaCalendarAlt, FaLayerGroup, FaCheckCircle } from 'react-icons/fa';
import { getSubjectById, getExamTypeById, NEW_BADGE_DAYS } from '../../utils/portalConstants';
import { isNewPaper } from '../../utils/filterUtils';

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const PaperCard = ({ paper, viewMode = 'grid', isBookmarked = false, onDownload, onPreview, onBookmark, onDownloadMemo }) => {
  const subject = getSubjectById(paper.subject);
  const examType = getExamTypeById(paper.examType);
  const isNew = isNewPaper(paper.uploadDate, NEW_BADGE_DAYS);
  const hasMemo = Boolean(paper.memoUrl);

  /* ── List view ─────────────────────────────────────────── */
  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-neutral-100 rounded-2xl px-5 py-4 hover:shadow-md hover:border-primary/20 transition-all">
        <div className="flex items-center gap-4">
          {/* Subject colour dot */}
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: subject?.color ?? '#0D4E25' }}
            aria-hidden="true"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-neutral-800 text-sm truncate">{paper.title}</h3>
              {isNew && (
                <span className="bg-accent-neon/15 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                  NEW
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <FaLayerGroup className="text-[10px]" /> Grade {paper.grade}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-[10px]" /> {paper.year} · {examType?.shortName}
              </span>
              <span className="flex items-center gap-1">
                <FaFileAlt className="text-[10px]" /> {formatSize(paper.fileSize)}
              </span>
              {hasMemo && (
                <span className="flex items-center gap-1 text-primary font-medium">
                  <FaCheckCircle className="text-[10px]" /> Memo
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onPreview(paper)}
              title="Preview"
              aria-label={`Preview ${paper.title}`}
              className="w-8 h-8 rounded-xl text-neutral-500 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <FaEye className="text-sm" />
            </button>
            <button
              onClick={() => onDownload(paper)}
              title="Download paper"
              aria-label={`Download ${paper.title}`}
              className="w-8 h-8 rounded-xl text-neutral-500 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <FaDownload className="text-sm" />
            </button>
            {hasMemo && (
              <button
                onClick={() => onDownloadMemo(paper)}
                title="Download memo"
                aria-label={`Download memo for ${paper.title}`}
                className="w-8 h-8 rounded-xl text-neutral-500 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <FaFileAlt className="text-sm" />
              </button>
            )}
            <button
              onClick={() => onBookmark(paper.id)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                isBookmarked ? 'text-primary bg-primary/10' : 'text-neutral-500 hover:text-primary hover:bg-primary/10'
              }`}
            >
              {isBookmarked ? <FaBookmark className="text-sm" /> : <FaRegBookmark className="text-sm" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Grid view ──────────────────────────────────────────── */
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all group flex flex-col">
      {/* Coloured subject header */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: subject?.color ?? '#0D4E25' }}
        aria-hidden="true"
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Title + badges */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <h3 className="font-heading font-semibold text-neutral-800 text-sm leading-snug line-clamp-2 flex-1">
            {paper.title}
          </h3>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {isNew && (
              <span className="bg-accent-neon/15 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                NEW
              </span>
            )}
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <FaLayerGroup className="text-primary/60 flex-shrink-0" /> Grade {paper.grade}
          </span>
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-primary/60 flex-shrink-0" /> {paper.year}
          </span>
          <span className="flex items-center gap-1.5">
            <FaFileAlt className="text-primary/60 flex-shrink-0" /> {formatSize(paper.fileSize)}
          </span>
          <span className="flex items-center gap-1.5">
            <FaFileAlt className="text-primary/60 flex-shrink-0" /> {paper.pageCount} pages
          </span>
        </div>

        {/* Exam type + subject tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-lg">
            {examType?.shortName}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-lg truncate max-w-[120px]">
            {subject?.name}
          </span>
          {hasMemo && (
            <span className="text-[11px] font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-lg flex items-center gap-1">
              <FaCheckCircle className="text-[9px]" /> Memo
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="space-y-2 pt-4 border-t border-neutral-100">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onPreview(paper)}
              aria-label={`Preview ${paper.title}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold border border-neutral-200 rounded-xl text-neutral-600 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
            >
              <FaEye /> Preview
            </button>
            <button
              onClick={() => onDownload(paper)}
              aria-label={`Download ${paper.title}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
            >
              <FaDownload /> Download
            </button>
          </div>

          {hasMemo && (
            <button
              onClick={() => onDownloadMemo(paper)}
              aria-label={`Download memo for ${paper.title}`}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold border border-primary/30 text-primary rounded-xl hover:bg-primary/10 transition-all"
            >
              <FaFileAlt /> Download Memo
            </button>
          )}

          <button
            onClick={() => onBookmark(paper.id)}
            aria-label={isBookmarked ? `Remove ${paper.title} from bookmarks` : `Bookmark ${paper.title}`}
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
              isBookmarked
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'border border-neutral-200 text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
