module.exports = {
  // drafts never become pages: filtered out before pagination,
  // so they are absent from output, collections, and the sitemap.
  pagination: {
    before: (paginationData) => paginationData.filter((s) => !s.draft),
  },
};
