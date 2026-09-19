module.exports = function (eleventyConfig) {
  // Static assets copied through unchanged
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Internal-only brand doc. Kept in the repo for reference but no longer
  // published: it documents the retired dark Rev.2 system and contradicts
  // the live Direction B site.
  eleventyConfig.ignores.add("src/BrandIdentity.html");

  // Live (non-draft) services, optionally narrowed to one category.
  // Filtering before the loop keeps `loop.last` correct — iterating the raw
  // list and skipping drafts inside leaves a trailing comma in JSON-LD.
  eleventyConfig.addFilter("live", (arr) => (arr || []).filter((s) => !s.draft));
  eleventyConfig.addFilter("category", (arr, cat) =>
    (arr || []).filter((s) => s.category === cat)
  );

  // FAQPage JSON-LD from a services.json faqs array
  eleventyConfig.addFilter("faqSchema", (faqs) =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (faqs || []).map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    })
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    // Let .html page files use Nunjucks (front matter, extends, blocks)
    htmlTemplateEngine: "njk",
  };
};
