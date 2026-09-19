# Data layer

Every fact and every per-service field lives here. Pages are templates; nothing
that varies per service or per city is hand-written in HTML.

## services.json — one entry per service page

| field | type | notes |
|---|---|---|
| `slug` | string | Must match the live URL exactly (`<slug>.html`). Never change on an existing entry. |
| `name` / `nav_label` | string | Display names (nav dropdown, footer, related links). |
| `category` | `"interior"` \| `"exterior"` | |
| `meta_title` / `meta_description` | string | Rendered verbatim into `<title>` / meta description. |
| `h1` | string | Landing-page headline. |
| `intro` | string[] \| null | 2–3 paragraphs. |
| `what_we_do` | string[] \| null | Scope bullets, `"Title — description"` format where the source used cards. |
| `process` | string[] \| null | Steps, in order. |
| `faqs` | `{question, answer}[]` \| null | |
| `price_range` | string \| null | Plain-language range, e.g. `"$4–8 per sq ft installed"`. |
| `self_perform` | bool \| null | |
| `cities` | string[] \| null | City slugs from cities.json. |
| `related` | string[] \| null | Slugs of related services (drives internal linking). |
| `hero_image` / `gallery` | string / string[] | Paths under `images/`. |
| `show_calculator` | bool | Landing page renders the estimate calculator. |
| `calculator_key` | string \| null | Which pricing.json table the calculator uses. Required when `show_calculator` is true. |
| `testimonials` | array | **Verbatim Google reviews only**, tagged to this service. Shape below. Leave `[]` until you have real ones. |
| `draft` | bool | `true` = not built, not in collections, not in sitemap. |

### testimonials entry shape

```json
{
  "author": "Full name as it appears on Google",
  "location": "Halifax, NS",
  "rating": 5,
  "text": "Verbatim review text. Do not edit, trim, or fix typos.",
  "source": "google",
  "date": "2026-05"
}
```

Never-say rule applies: testimonials that aren't verbatim from a real, named
customer do not ship. Empty array = the page's testimonial section doesn't render.

## cities.json

`slug`, `name`, `nav_label`, `local_context` (owner-written; null until then).

## pricing.json

The estimate calculator's rate tables. Keys are `calculator_key` values.
Each: `label`, `unit`, and `[low, high]` per finish level
(`standard` / `premium` / `complex`). Rates are per-unit dollars.

## site.json

Single source of truth for company facts (founding year, phone, email, GBP URL,
review count/rating, social URLs). If a fact appears on a page, it reads from
here — a fact must never live in more than one place.
