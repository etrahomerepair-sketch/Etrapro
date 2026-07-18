module.exports = function (eleventyConfig) {
  // Static assets copied through unchanged
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Internal standalone page: copied verbatim, never templated
  eleventyConfig.ignores.add("src/BrandIdentity.html");
  eleventyConfig.addPassthroughCopy("src/BrandIdentity.html");

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
