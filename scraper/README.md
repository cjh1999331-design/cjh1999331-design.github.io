# Book Catalog Scraper

Scrapes product listings (title, price, rating, stock, link) across paginated pages and exports a clean CSV plus a formatted Excel report with a summary sheet.

Features: pagination, retries with backoff, polite rate limiting, typed fields, styled Excel output.

```bash
pip install -r requirements.txt
python scraper.py --pages 5 --out books
```

Demo target: books.toscrape.com, a public sandbox built for scraping practice.
