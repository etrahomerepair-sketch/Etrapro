// Per-URL lastmod dates for the generated sitemap, from git history.
// Falls back to the build date when git is unavailable (e.g. shallow CI clone edge cases).
const { execSync } = require("child_process");
const path = require("path");

const REPO = path.join(__dirname, "..", "..");

function gitDate(p) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${p}"`, {
      cwd: REPO,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return out || null;
  } catch {
    return null;
  }
}

module.exports = () => {
  const services = require("./services.json");
  const fallback = new Date().toISOString().slice(0, 10);
  const result = {
    fallback,
    home: gitDate("src/index.html") || fallback,
    services: {},
  };
  for (const s of services) {
    // bespoke pages change via their include dir; generated pages via the data file
    const source = s.bespoke
      ? `src/_includes/services/${s.slug}`
      : "src/_data/services.json";
    result.services[s.slug] = gitDate(source) || fallback;
  }
  return result;
};
