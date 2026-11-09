# Golden Dragon 金龙饭店

A fictional Chinese restaurant in Phnom Penh, Cambodia, created as a portfolio sample. Buildless HTML, CSS and vanilla JavaScript; no dependencies or backend.

## Run

Open `index.html` directly, or from the repository root run `python3 -m http.server 8000` and visit `http://localhost:8000/golden-dragon/`. No build step. Deploy this folder unchanged to any static host.

## Files

- `index.html`: semantic structure, Google Maps embed and contact form.
- `styles.css`: responsive red, gold and cream design with CSS ornamentation and sample QR artwork.
- `i18n.js`: all displayed copy, dish names, prices, language labels and validation messages, keyed by `zh`, `en`, `km`.
- `script.js`: language switching, guarded localStorage persistence, menu filters and form validation.

Chinese is the default. Language changes update the page and `html[lang]` without reloading. All eight dishes retain Chinese and English names in every language. Khmer copy is a reasonable draft and **should be checked by a native speaker** before publication.

## Replace before real use

Replace every `https://t.me/your_username` link, phone number, sample address, menu, opening hours and map destination with verified details. The payment QR is decorative CSS artwork, explicitly labeled as a sample, and cannot be used to pay. Replace it with a verified merchant QR only for a real restaurant. ABA, Wing and cash are illustrative accepted methods.

The form checks nonblank name/message and a valid email, displays field errors and focuses the first invalid field. It never sends, stores or logs submitted data. Successful validation explicitly says that no message was sent; visitors should use Telegram or phone. A real contact workflow requires a separate backend and appropriate privacy handling.

Google Fonts and Google Maps require internet access and may be blocked by privacy settings. System fonts remain available; the map has a direct link fallback. JavaScript is required for translated content and interactions. Nothing else is downloaded, and there are no external images.

## Manual review

Check Chinese, English and Khmer, persistence on reload, menu filters, keyboard navigation/focus, invalid and valid form submissions, and layouts at 375, 768 and 1440 pixels. Check long Khmer text and external map/font loading in the intended deployment browser. Reduced-motion preferences are respected.
