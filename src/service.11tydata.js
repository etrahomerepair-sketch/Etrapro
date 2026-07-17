module.exports = {
  eleventyComputed: {
    // drafts build nowhere: no output file, no collections, no sitemap
    permalink: (data) => (data.service && data.service.draft ? false : `${data.service.slug}.html`),
    eleventyExcludeFromCollections: (data) => Boolean(data.service && data.service.draft),
  },
};
