/* =====================================================================
   Cake Lush — site content & configuration
   Edit this file to change contact details, coupons, products, reviews,
   FAQs and chat answers. Each block maps 1:1 to a future backend table/API.
   ===================================================================== */
const CONFIG = {
  phone: '+1 (786)-774-8853',
  email: 'jessica@cakelush.com',
  social: { daily: 'https://www.instagram.com/', bespoke: 'https://www.instagram.com/', facebook: '' }, // TODO: real social URLs
  mapQuery: 'Miami, FL',
  coupons: { LUSH10: 0.10, WELCOME15: 0.15 }, // DEMO codes — replace with client's codes
  noticeHours: 48
};

/* Image library: key -> file path */
const IMG = {
 "hero-cake.jpg": "assets/images/hero-cake.jpg",
 "bespoke.jpg": "assets/images/bespoke.jpg",
 "daily.jpg": "assets/images/daily.jpg",
 "black-gold-trio.jpg": "assets/images/black-gold-trio.jpg",
 "unicorn.jpg": "assets/images/unicorn.jpg",
 "giftbox.jpg": "assets/images/giftbox.jpg",
 "hearts.jpg": "assets/images/hearts.jpg",
 "gallery/cake-09.jpg": "assets/images/gallery/cake-09.jpg",
 "gallery/cake-26.jpg": "assets/images/gallery/cake-26.jpg",
 "gallery/cake-05.jpg": "assets/images/gallery/cake-05.jpg",
 "gallery/cake-21.jpg": "assets/images/gallery/cake-21.jpg",
 "gallery/cake-13.jpg": "assets/images/gallery/cake-13.jpg",
 "gallery/cake-03.jpg": "assets/images/gallery/cake-03.jpg",
 "gallery/cake-01.jpg": "assets/images/gallery/cake-01.jpg",
 "gallery/cake-02.jpg": "assets/images/gallery/cake-02.jpg",
 "gallery/cake-04.jpg": "assets/images/gallery/cake-04.jpg",
 "gallery/cake-06.jpg": "assets/images/gallery/cake-06.jpg",
 "gallery/cake-07.jpg": "assets/images/gallery/cake-07.jpg",
 "gallery/cake-08.jpg": "assets/images/gallery/cake-08.jpg",
 "gallery/cake-10.jpg": "assets/images/gallery/cake-10.jpg",
 "gallery/cake-11.jpg": "assets/images/gallery/cake-11.jpg",
 "gallery/cake-12.jpg": "assets/images/gallery/cake-12.jpg",
 "gallery/cake-14.jpg": "assets/images/gallery/cake-14.jpg",
 "gallery/cake-15.jpg": "assets/images/gallery/cake-15.jpg",
 "gallery/cake-16.jpg": "assets/images/gallery/cake-16.jpg",
 "gallery/cake-17.jpg": "assets/images/gallery/cake-17.jpg",
 "gallery/cake-18.jpg": "assets/images/gallery/cake-18.jpg",
 "gallery/cake-19.jpg": "assets/images/gallery/cake-19.jpg",
 "gallery/cake-20.jpg": "assets/images/gallery/cake-20.jpg",
 "gallery/cake-22.jpg": "assets/images/gallery/cake-22.jpg",
 "gallery/cake-23.jpg": "assets/images/gallery/cake-23.jpg",
 "gallery/cake-24.jpg": "assets/images/gallery/cake-24.jpg",
 "gallery/cake-25.jpg": "assets/images/gallery/cake-25.jpg",
 "gallery/cake-27.jpg": "assets/images/gallery/cake-27.jpg",
 "gallery/cake-28.jpg": "assets/images/gallery/cake-28.jpg",
 "gallery/cake-29.jpg": "assets/images/gallery/cake-29.jpg",
 "gallery/cake-30.jpg": "assets/images/gallery/cake-30.jpg",
 "gallery/cake-31.jpg": "assets/images/gallery/cake-31.jpg",
 "gallery/cake-32.jpg": "assets/images/gallery/cake-32.jpg",
 "gallery/cake-33.jpg": "assets/images/gallery/cake-33.jpg",
 "bento.jpg": "assets/images/bento.jpg",
 "pinkbox.jpg": "assets/images/pinkbox.jpg",
 "marble.jpg": "assets/images/marble.jpg",
 "heel.jpg": "assets/images/heel.jpg",
 "gucci.jpg": "assets/images/gucci.jpg",
 "batman.jpg": "assets/images/batman.jpg",
 "roses.jpg": "assets/images/roses.jpg",
 "yellow.jpg": "assets/images/yellow.jpg",
 "logo.png": "assets/images/logo.png",
 "p1.jpg": "assets/images/p1.jpg",
 "p2.jpg": "assets/images/p2.jpg",
 "p3.jpg": "assets/images/p3.jpg",
 "p4.jpg": "assets/images/p4.jpg",
 "bg.jpg": "assets/images/bg.jpg"
};

/* Store products */
window.PRODUCTS = [
 {
  "id": 1,
  "k": "floral bouquet gift box flowers",
  "n": "The Signature Bloom",
  "p": 85,
  "c": "daily",
  "img": "p1.jpg",
  "t": "Gift Box",
  "d": "Our signature floral creation, boxed and ready to gift."
 },
 {
  "id": 2,
  "k": "floral cupcakes box botanical",
  "n": "The Lush Botanical Box",
  "p": 28,
  "c": "daily",
  "img": "p2.jpg",
  "t": "Cupcakes",
  "d": "Botanical cupcakes presented in a keepsake box."
 },
 {
  "id": 3,
  "k": "birthday round pink cake",
  "n": "Round Cake (for any occasion)",
  "p": 70,
  "c": "daily",
  "img": "p3.jpg",
  "t": "Cakes",
  "d": "A classic round cake, finished for any occasion."
 },
 {
  "id": 4,
  "k": "heart love anniversary cake",
  "n": "Heart Shaped Cake",
  "p": 115,
  "c": "daily",
  "img": "p4.jpg",
  "t": "Cakes",
  "d": "Heart-shaped cake for anniversaries and celebrations."
 }
];

/* DEMO reviews — client can replace/extend (photo: '' shows an initials avatar) */
const REVIEWS = [
  { name: 'Sophia M.', photo: '', rating: 5, title: 'A work of art', text: 'Our wedding cake was breathtaking — every guest asked who made it. The details were flawless and the flavor even better than the design. Truly edible architecture.' },
  { name: 'Daniel R.', photo: '', rating: 5, title: 'Perfect birthday cake', text: 'Ordered a birthday cake for my wife and it looked exactly like the inspiration photo. Fresh, moist and delivered right on time.' },
  { name: 'Camila V.', photo: '', rating: 5, title: 'Worth every penny', text: 'The communication was smooth from the first quote to delivery. The guava filling was a huge hit with the whole family.' },
  { name: 'Isabella T.', photo: '', rating: 5, title: 'Elegant and modern', text: 'We wanted something modern and minimal for our engagement party. The cake was stunning and tasted incredible.' },
  { name: 'Marcus L.', photo: '', rating: 5, title: 'Corporate event favorite', text: 'Cake Lush created a custom cake for our company launch. Professional, punctual and absolutely beautiful.' },
  { name: 'Ana P.', photo: '', rating: 5, title: 'Beautiful bento cakes', text: 'The bento cakes are adorable and delicious. I order them for every small celebration now.' },
  { name: 'Olivia K.', photo: '', rating: 5, title: 'Stress-free ordering', text: 'The quote form was easy and the reply was quick. The final cake exceeded what I imagined.' },
  { name: 'Jordan B.', photo: '', rating: 5, title: 'Highly recommend', text: 'Beautiful presentation, amazing flavor and such kind service. Already planning my next order.' }
];

/* Chat assistant — FAQ tab */
const FAQS = [
  ['How much notice do you need?', 'A minimum of 48 hours’ advance notice is required for all orders.'],
  ['Do you deliver?', 'Yes — across Miami and Florida. Delivery is scheduled around timing, traffic and cake size.'],
  ['How do I order?', 'Add items from the <a href="#/store">Store</a> to your cart and press checkout — your order is sent to us by email. For custom designs, use <a href="#/quotes">Get a Quote</a>.'],
  ['What flavors do you offer?', 'Every quote includes Vanilla with Almond Buttercream. See all options on the <a href="#/flavors">Flavors</a> page.'],
  ['Do you make wedding cakes?', 'Yes — Lush Bespoke creates custom high-fashion wedding cakes and edible architecture. <a href="#/inquiries">Start an inquiry</a>.'],
  ['Can I send inspiration photos?', 'Absolutely. Mention it in your quote and attach the pictures to the email once we reply.']
];

/* Chat assistant — rule-based answers. k = regex tested against the visitor's message (first match wins). */
const fmt = n => '$' + Number(n).toFixed(2);
const BOT_CHIPS = ['View menu', 'Prices', 'Delivery', 'Get a quote', 'Contact'];
const BOT = [
  { k: '^(hi|hello|hey|hola|good (morning|afternoon|evening)|salam|assalam)', a: 'Hello! 👋 Welcome to Cake Lush. Ask me about our cakes, prices, delivery, flavors or weddings — or tap a topic below.', c: BOT_CHIPS },
  { k: 'thank|thx|appreciate', a: 'You’re very welcome! Anything else I can help with?', c: ['View menu', 'Contact'] },
  { k: '\\b(bye|goodbye|see you)\\b', a: 'Goodbye! We’d love to make your next celebration lush. 🎂' },
  { k: 'menu|store|shop|products|catalog|order list|list|what do you (sell|have|offer)', a: () => '<b>Lush Daily — ready-to-order:</b><br>' + PRODUCTS.map(p => '• ' + p.n + ' — ' + fmt(p.p)).join('<br>') + '<br><a href="#/store">Open the store →</a>', c: ['Prices', 'How to order', 'Flavors'] },
  { k: 'price|cost|how much|\\$|expensive|cheap|budget', a: () => '<b>Store prices:</b><br>' + PRODUCTS.map(p => '• ' + p.n + ': ' + fmt(p.p)).join('<br>') + '<br>Custom and wedding cakes are quoted individually — <a href="#/quotes">request a quote</a>.', c: ['Get a quote', 'View menu'] },
  { k: 'how.*(order|buy|purchase)|checkout|place.*order|order online|^order', a: 'It’s easy: 1) pick items in the <a href="#/store">Store</a>, 2) open your cart and press checkout, 3) fill in your details — your order opens as an email to us, with a copy to you. For custom designs use <a href="#/quotes">Get a Quote</a>.', c: ['Delivery', '48 hours notice'] },
  { k: '48|notice|advance|how (soon|long)|rush|last.?minute|urgent|same.?day', a: 'We require a minimum of 48 hours’ advance notice for all orders. Materials, boxing and packaging are subject to current inventory.', c: ['Delivery', 'Contact'] },
  { k: 'deliver|shipping|ship|drop.?off', a: 'We deliver across Miami and Florida. Delivery is scheduled around timing, traffic and cake size so your cake arrives safely. Tell us your venue when you order.', c: ['Get a quote', 'Contact'] },
  { k: 'pick.?up|collect', a: 'Pickup is available — choose “Pickup” at checkout and we’ll confirm the details by email.', c: ['Delivery', 'Contact'] },
  { k: 'hour|open|close|when are you|available', a: 'For current availability and hours, please <a href="#/inquiries">send an inquiry</a> or contact us directly — we’ll confirm your date.', c: ['Contact', '48 hours notice'] },
  { k: 'flavo|taste|vanilla|almond|included', a: 'Every quote includes <b>Vanilla with Almond Buttercream</b>. Extra flavors: Armaretto, Coconut, Banana, Carrot, Chocolate, Cookies &amp; Cream, Lemon, Red Velvet, Marble. <a href="#/flavors">See flavors →</a>', c: ['Fillings', 'Get a quote'] },
  { k: 'filling', a: 'Fillings: Guava, Pineapple, Strawberry, Lemon, Nutella and Dulce Leche. <a href="#/flavors">Build your combo →</a>', c: ['Flavors', 'Get a quote'] },
  { k: 'wedding|bridal|bespoke|engagement', a: 'Cake Lush Bespoke creates elegant wedding cakes and edible architecture, designed one of a kind. <a href="#/inquiries">Start a bespoke inquiry →</a>', c: ['Lookbook', 'Contact'] },
  { k: 'birthday|kids|child|baby|shower|anniversar', a: 'We make personalised birthday, kids and celebration cakes. Browse <a href="#/birthday-cakes-miami">Birthday Cakes</a> or <a href="#/quotes">request a quote</a>.', c: ['Prices', 'Lookbook'] },
  { k: 'cupcake|bento|mini', a: 'Our Lush Daily store has cupcakes and gift boxes, and Bento Cakes for any occasion. <a href="#/store">Shop now →</a>', c: ['Prices', 'View menu'] },
  { k: 'quote|custom|design|theme|inspiration|photo|picture', a: 'For custom cakes, fill in the <a href="#/quotes">quote form</a>. You can attach inspiration pictures to the email once we reply.', c: ['Flavors', 'Delivery'] },
  { k: 'inquir|consult|appointment|book', a: 'Choose Cake Lush or Cake Lush Bespoke on the <a href="#/inquiries">Inquiries</a> page and tell us about your event.', c: ['Wedding cakes', 'Contact'] },
  { k: 'lookbook|gallery|portfolio|magazine|examples|work', a: 'Flip through our magazines in the <a href="#/lookbook">Lookbook</a> — Lush Bespoke and Lush Daily.', c: ['Get a quote'] },
  { k: 'corporate|event|company|party|launch', a: 'We create designer event cakes for corporate and private events. <a href="#/designer-event-cakes-miami">Learn more →</a>', c: ['Get a quote', 'Contact'] },
  { k: 'phone|call|number|contact|email|reach|talk|speak|message', a: () => 'You can reach us at:<br>📞 <a href="tel:' + CONFIG.phone + '">' + CONFIG.phone + '</a><br>✉️ <a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a><br>Or open the Contact tab above.', c: ['Instagram', 'Get a quote'] },
  { k: 'instagram|social|facebook|follow|insta', a: () => 'Follow us: <a href="' + CONFIG.social.daily + '" target="_blank" rel="noopener">Lush Daily</a> · <a href="' + CONFIG.social.bespoke + '" target="_blank" rel="noopener">Lush Bespoke</a>' },
  { k: 'pay|card|invoice|cash|deposit', a: 'There’s no online payment on the site. Orders are sent to us by email, and we confirm the details and payment with you directly.', c: ['How to order', 'Contact'] },
  { k: 'coupon|discount|promo|code|offer|deal', a: 'Have a coupon code? Enter it in your cart before checkout and the discount is applied automatically.', c: ['View menu'] },
  { k: 'allerg|gluten|vegan|dairy|nut\\b|diet', a: 'Please mention any allergies or dietary needs in your quote or inquiry so we can confirm what’s possible.', c: ['Get a quote', 'Contact'] },
  { k: 'where|location|address|miami|florida|city', a: 'We’re based in Miami, FL and serve all across Florida. See the Map tab above.', c: ['Delivery', 'Contact'] }
];
const BOT_FALLBACK = { a: 'I’m not sure I caught that — try one of these topics, or <a href="#/inquiries">send us an inquiry</a> and we’ll reply personally.', c: BOT_CHIPS };
