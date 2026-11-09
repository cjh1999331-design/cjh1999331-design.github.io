# Bean & Leaf

A responsive, accessible, one-page static coffee shop website. Built with HTML, CSS, and a small vanilla JavaScript file. No dependencies, build step, or external JS libraries.

## Open

Open `index.html` directly in a modern browser. Alternatively, from this folder run `python3 -m http.server 8000` and visit http://localhost:8000. Internet access is needed only for the embedded Google Map; the rest of the page works offline.

## Customize

- **Content:** Edit `index.html` to change the tagline, six sample drinks, USD prices, hours, and placeholder address. All hours are Phnom Penh local time (UTC+7).
- **Map:** Replace the iframe `src` query with the shop's real address or coordinates and update the “Open in Google Maps” link. The current map shows Phnom Penh generally, not the sample street address.
- **Style:** Update the color variables at the top of `styles.css`. Layout breakpoints are 640px and 900px; the design supports 375px mobile through 1440px desktop and beyond. The hero illustration uses decorative CSS shapes, so no image assets or alt text are needed. Add descriptive alt text if introducing meaningful images.
- **Form:** `script.js` validates required fields, trims whitespace when checking empty values, and checks email syntax. Errors appear inline and the first invalid field receives focus. A valid submission displays an explicit demo success message; it never sends or stores a message. Connect a backend and replace the demo handler and explanatory text before accepting real messages. Native required/email validation remains available without JavaScript, but there is no delivery endpoint.

## Accessibility and manual checks

Semantic landmarks, a skip link, visible keyboard focus, form labels and error associations, live feedback, scoped table headers, a titled map iframe, and reduced-motion support are included. Navigation uses native anchor links and CSS smooth scrolling with a sticky-header offset.

Check at 375, 640, 768, 1024, and 1440px widths for overflow and readable content. Tab through navigation and form fields. Submit an empty form, a malformed email, whitespace-only values, and valid data; check errors, focus, and the demo success message. Confirm “Visit us” reaches Location and reduced-motion preference disables smooth scrolling.
