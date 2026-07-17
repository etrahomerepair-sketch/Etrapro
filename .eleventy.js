module.exports = function (eleventyConfig) {
  // Static assets copied through unchanged
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // Internal standalone page: copied verbatim, never templated
  eleventyConfig.ignores.add("src/BrandIdentity.html");
  eleventyConfig.addPassthroughCopy("src/BrandIdentity.html");

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
