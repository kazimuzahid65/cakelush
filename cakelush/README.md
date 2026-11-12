# Cake Lush website

Static site (HTML / CSS / vanilla JS). Open `index.html` or host on GitHub Pages.

```
index.html          page markup (all pages, hash-routed: #/index, #/store, ...)
css/style.css       all styles (theme variables at the top)
js/data.js          CONTENT & CONFIG: contact info, coupons, products, reviews, FAQs, chat answers, image paths
js/app.js           behaviour: router, cart, email checkout, store filters, forms, lookbook flipbooks, reviews, chat
assets/images/      all images (referenced from js/data.js -> IMG)
```

## Edit content without touching logic (js/data.js)
- `CONFIG` — phone, email, Instagram URLs, map query, coupon codes (LUSH10 / WELCOME15 are DEMO codes).
- `PRODUCTS` — store items (`n` name, `p` price, `t` type, `k` search keywords, `d` description, `img` image key).
- `REVIEWS` — scrolling reviews (`name`, `photo`, `rating`, `title`, `text`). Demo content.
- `FAQS` / `BOT` — chat assistant FAQ tab and automatic replies (`k` = regex of trigger words).

## Checkout (no online payment)
Cart → Checkout → form → opens the visitor's email app addressed to `CONFIG.email` with a formatted receipt (copy to the customer via CC). "Download Order Card" saves a branded PNG to attach.

## Backend-ready notes
- Replace the `mailto:` calls (quote/inquiry forms and checkout in `app.js`) with `fetch('/api/...')`; send confirmation emails server-side (customer receipt + owner notification).
- `PRODUCTS`, `REVIEWS`, `FAQS`, `BOT`, `CONFIG.coupons` map directly to API/database tables.
- Cart/coupon/theme are kept in `localStorage` (keys `cl-*`).
