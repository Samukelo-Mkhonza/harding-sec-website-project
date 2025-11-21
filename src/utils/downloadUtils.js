/**
 * Download utilities for the Past Papers Portal
 */

/**
 * Download a single PDF file
 * @param {string} url - URL to the PDF file
 * @param {string} filename - Desired filename for download
 * @returns {Promise<boolean>} Success status
 */
export const downloadPDF = async (url, filename) => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Log analytics (without PII)
    logDownload({ filename, type: 'paper' });
    
    return true;
  } catch (error) {
    console.error('Download error:', error);
    return false;
  }
};

/**
 * Download both paper and memo
 * @param {Object} paper - Paper object with pdfUrl and memoUrl
 * @returns {Promise<boolean>} Success status
 */
export const downloadBoth = async (paper) => {
  try {
    // Download paper
    await downloadPDF(paper.pdfUrl, `${paper.id}-paper.pdf`);
    
    // Small delay to prevent browser blocking multiple downloads
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Download memo
    if (paper.memoUrl) {
      await downloadPDF(paper.memoUrl, `${paper.id}-memo.pdf`);
    }
    
    // Log analytics
    logDownload({ paperId: paper.id, type: 'both' });
    
    return true;
  } catch (error) {
    console.error('Download both error:', error);
    return false;
  }
};

/**
 * Log download analytics without PII
 * @param {Object} data - Download data
 */
const logDownload = (data) => {
  try {
    // Get existing analytics or initialize
    const analytics = JSON.parse(localStorage.getItem('hss_portal_analytics') || '[]');
    
    // Add new download event (no PII - just paper metadata)
    analytics.push({
      timestamp: new Date().toISOString(),
      ...data
    });
    
    // Keep only last 100 events
    const trimmed = analytics.slice(-100);
    
    localStorage.setItem('hss_portal_analytics', JSON.stringify(trimmed));
  } catch (error) {
    console.error('Analytics logging error:', error);
  }
};

/**
 * Get download analytics
 * @returns {Array} Analytics data
 */
export const getDownloadAnalytics = () => {
  try {
    return JSON.parse(localStorage.getItem('hss_portal_analytics') || '[]');
  } catch (error) {
    console.error('Error reading analytics:', error);
    return [];
  }
};

/**
 * Format filename for download
 * @param {Object} paper - Paper object
 * @param {string} type - 'paper' or 'memo'
 * @returns {string} Formatted filename
 */
export const formatFilename = (paper, type = 'paper') => {
  const subject = paper.subject.replace(/[^a-z0-9]/gi, '-');
  const examType = paper.examType.replace(/[^a-z0-9]/gi, '-');
  return `${subject}-grade${paper.grade}-${paper.year}-${examType}-${type}.pdf`;
};
