"""
Book catalog scraper -> CSV + formatted Excel report.

Demo target: https://books.toscrape.com (a public sandbox site built for scraping practice).
Usage:  python scraper.py --pages 5 --out books
"""
import argparse, csv, time
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

BASE = "https://books.toscrape.com/catalogue/"
RATING = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5}
HEADERS = {"User-Agent": "Mozilla/5.0 (portfolio demo scraper)"}


def fetch(session, url, retries=3):
    for attempt in range(retries):
        try:
            r = session.get(url, headers=HEADERS, timeout=15)
            r.raise_for_status()
            r.encoding = "utf-8"
            return r.text
        except requests.RequestException:
            if attempt == retries - 1:
                raise
            time.sleep(2 ** attempt)


def parse_page(html, page_url):
    soup = BeautifulSoup(html, "html.parser")
    rows = []
    for card in soup.select("article.product_pod"):
        a = card.h3.a
        rows.append({
            "title": a["title"],
            "price_gbp": float(card.select_one(".price_color").text.strip().lstrip("£Â")),
            "rating": RATING.get(card.select_one(".star-rating")["class"][1], 0),
            "in_stock": "In stock" in card.select_one(".availability").text,
            "url": urljoin(page_url, a["href"]),
        })
    nxt = soup.select_one("li.next a")
    return rows, (urljoin(page_url, nxt["href"]) if nxt else None)


def scrape(pages):
    session, url, data = requests.Session(), urljoin(BASE, "page-1.html"), []
    for i in range(pages):
        if not url:
            break
        rows, url = parse_page(fetch(session, url), url)
        data.extend(rows)
        print(f"page {i + 1}: {len(rows)} items")
        time.sleep(0.5)  # be polite
    return data


def save_csv(data, path):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=data[0].keys())
        w.writeheader()
        w.writerows(data)


def save_xlsx(data, path):
    wb = Workbook()
    ws = wb.active
    ws.title = "Books"
    cols = ["Title", "Price (GBP)", "Rating", "In stock", "URL"]
    ws.append(cols)
    for d in data:
        ws.append([d["title"], d["price_gbp"], d["rating"], "Yes" if d["in_stock"] else "No", d["url"]])
    head = PatternFill("solid", fgColor="1F4E79")
    for c in ws[1]:
        c.font, c.fill, c.alignment = Font(bold=True, color="FFFFFF"), head, Alignment(horizontal="center")
    for i, width in enumerate([55, 13, 9, 10, 70], 1):
        ws.column_dimensions[get_column_letter(i)].width = width
    for c in ws["B"][1:]:
        c.number_format = "£#,##0.00"
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = ws.dimensions

    s = wb.create_sheet("Summary")
    n = len(data)
    s.append(["Metric", "Value"])
    s.append(["Books scraped", n])
    s.append(["Average price (GBP)", round(sum(d["price_gbp"] for d in data) / n, 2)])
    s.append(["Average rating", round(sum(d["rating"] for d in data) / n, 2)])
    s.append(["In stock", sum(d["in_stock"] for d in data)])
    s.append([])
    s.append(["Rating", "Count"])
    for r in range(5, 0, -1):
        s.append([f"{r} stars", sum(1 for d in data if d["rating"] == r)])
    for c in s[1]:
        c.font, c.fill = Font(bold=True, color="FFFFFF"), head
    s.column_dimensions["A"].width, s.column_dimensions["B"].width = 24, 12
    wb.save(path)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages", type=int, default=5)
    ap.add_argument("--out", default="books")
    a = ap.parse_args()
    data = scrape(a.pages)
    save_csv(data, f"{a.out}.csv")
    save_xlsx(data, f"{a.out}.xlsx")
    print(f"saved {len(data)} rows to {a.out}.csv and {a.out}.xlsx")
