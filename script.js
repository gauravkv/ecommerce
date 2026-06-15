/* ============================================
   ShopEasy — Main Script
   GTM DataLayer Events integrated throughout
   ============================================ */

// ===== GTM dataLayer initialization =====
window.dataLayer = window.dataLayer || [];

function pushGTM(event, data = {}) {
  const payload = { event, ...data, timestamp: new Date().toISOString() };
  window.dataLayer.push(payload);
  logGTMEvent(event, data);
  console.log('📊 GTM Event:', payload);
}

function logGTMEvent(event, data) {
  const log = document.getElementById('gtmLog');
  if (!log) return;
  const empty = log.querySelector('.log-empty');
  if (empty) empty.remove();
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `▶ ${event}${data.item_name ? ` | ${data.item_name}` : ''}${data.value ? ` | ₹${data.value}` : ''}`;
  log.prepend(entry);
}

// ===== PRODUCT DATA =====
const products = [
  // Electronics
  { id: 1, name: 'Sony WH-1000XM5 Headphones', cat: 'electronics', emoji: '🎧', price: 24999, original: 34990, rating: 4.8, reviews: 1240, badge: 'Best Seller', desc: 'Industry-leading noise canceling with exceptional sound quality. Up to 30-hr battery life, comfortable design for all-day wear.' },
  { id: 2, name: 'Samsung 65" 4K Smart TV', cat: 'electronics', emoji: '📺', price: 54999, original: 79990, rating: 4.6, reviews: 876, badge: '31% OFF', desc: 'Crystal clear 4K display with HDR10+ support. Smart TV with built-in streaming apps and voice assistant.' },
  { id: 3, name: 'Apple iPad Air 11"', cat: 'electronics', emoji: '📱', price: 59900, original: 64900, rating: 4.9, reviews: 2134, badge: null, desc: 'M2 chip for blazing-fast performance. All-day battery, 12MP camera, USB-C connectivity. Perfect for work and play.' },
  { id: 4, name: 'Canon EOS R50 Camera', cat: 'electronics', emoji: '📷', price: 67990, original: 89990, rating: 4.7, reviews: 453, badge: '24% OFF', desc: 'Compact mirrorless with 24.2MP APS-C sensor. 4K video, Wi-Fi enabled, ideal for travel photography.' },
  { id: 5, name: 'Mechanical Keyboard RGB', cat: 'electronics', emoji: '⌨️', price: 4999, original: 7499, rating: 4.5, reviews: 689, badge: null, desc: 'Full RGB backlit mechanical keyboard with Cherry MX Blue switches. Ideal for gaming and typing enthusiasts.' },
  { id: 6, name: 'Noise Cancelling Earbuds', cat: 'electronics', emoji: '🎵', price: 8999, original: 13999, rating: 4.4, reviews: 1100, badge: '35% OFF', desc: 'True wireless earbuds with active noise cancellation. 28-hour total battery with charging case, IPX4 water resistance.' },

  // Fashion
  { id: 7, name: "Men's Premium Linen Shirt", cat: 'fashion', emoji: '👔', price: 1499, original: 2499, rating: 4.3, reviews: 320, badge: null, desc: 'Breathable 100% linen fabric. Relaxed fit, perfect for casual and semi-formal occasions.' },
  { id: 8, name: "Women's Floral Kurti Set", cat: 'fashion', emoji: '👗', price: 1299, original: 1999, badge: 'Trending', rating: 4.6, reviews: 542, desc: 'Beautiful floral print cotton kurti with matching pants. Comfortable and stylish for everyday wear.' },
  { id: 9, name: 'Classic White Sneakers', cat: 'fashion', emoji: '👟', price: 2499, original: 3999, rating: 4.5, reviews: 890, badge: null, desc: 'Premium leather upper with cushioned sole. Versatile white sneaker that goes with every outfit.' },
  { id: 10, name: 'Leather Tote Bag', cat: 'fashion', emoji: '👜', price: 3299, original: 5499, rating: 4.7, reviews: 211, badge: '40% OFF', desc: 'Genuine leather tote with spacious interior. Perfect for office or casual outings. Available in 3 colors.' },

  // Home & Kitchen
  { id: 11, name: 'Instant Pot Duo 7-in-1', cat: 'home', emoji: '🍲', price: 9499, original: 12999, rating: 4.8, reviews: 3421, badge: 'Best Seller', desc: '7-in-1 electric pressure cooker. Replaces 7 kitchen appliances. 6-quart capacity, ideal for families.' },
  { id: 12, name: 'Air Fryer 4.5L', cat: 'home', emoji: '🥘', price: 5999, original: 8999, rating: 4.6, reviews: 1876, badge: null, desc: 'Cook crispy food with 95% less oil. 4.5-litre capacity, 8 preset programs, easy-clean non-stick basket.' },
  { id: 13, name: 'Egyptian Cotton Bedsheet Set', cat: 'home', emoji: '🛏️', price: 2999, original: 4999, rating: 4.4, reviews: 567, badge: null, desc: '400 thread count pure Egyptian cotton. King size set with 2 pillow covers. Machine washable, super soft.' },
  { id: 14, name: 'Aromatic Diffuser + Oils', cat: 'home', emoji: '🕯️', price: 1899, original: 2999, rating: 4.5, reviews: 430, badge: null, desc: 'Ultrasonic aroma diffuser with 7 essential oils. LED mood lighting with timer function. Perfect for relaxation.' },

  // Books
  { id: 15, name: 'Atomic Habits — James Clear', cat: 'books', emoji: '📗', price: 349, original: 599, rating: 4.9, reviews: 12345, badge: '#1 Bestseller', desc: "The world's most popular book on habit building. Proven framework to build good habits and break bad ones." },
  { id: 16, name: 'Rich Dad Poor Dad', cat: 'books', emoji: '📘', price: 299, original: 499, rating: 4.7, reviews: 8900, badge: null, desc: 'Robert Kiyosaki\'s personal finance classic. Learn the mindset difference between the rich and everyone else.' },
  { id: 17, name: 'The Psychology of Money', cat: 'books', emoji: '📙', price: 379, original: 599, rating: 4.8, reviews: 6700, badge: null, desc: 'Morgan Housel on the timeless lessons about wealth, greed and happiness. A must-read for every investor.' },
  { id: 18, name: 'Deep Work — Cal Newport', cat: 'books', emoji: '📕', price: 329, original: 499, rating: 4.6, reviews: 4200, badge: null, desc: 'Rules for focused success in a distracted world. Learn to master the skill of deep concentration.' },

  // Beauty
  { id: 19, name: 'Vitamin C Serum 30ml', cat: 'beauty', emoji: '✨', price: 899, original: 1499, rating: 4.5, reviews: 2100, badge: 'Top Pick', desc: 'Brightening serum with 20% Vitamin C, Hyaluronic Acid and Ferulic Acid. Reduces dark spots in 4 weeks.' },
  { id: 20, name: 'Maybeline Mascara Set', cat: 'beauty', emoji: '💄', price: 699, original: 999, rating: 4.3, reviews: 876, badge: null, desc: 'Volume-boosting mascara with a unique curved brush. Smudge-proof formula for all-day wear.' },
  { id: 21, name: 'Minimalist SPF 50 Sunscreen', cat: 'beauty', emoji: '🧴', price: 399, original: 599, rating: 4.7, reviews: 5430, badge: 'Best Seller', desc: 'Lightweight, non-greasy mineral sunscreen. Broad-spectrum SPF 50 PA++++. No white cast. Dermatologist tested.' },
  { id: 22, name: 'Beard Grooming Kit', cat: 'beauty', emoji: '🪒', price: 1299, original: 1999, rating: 4.4, reviews: 670, badge: null, desc: 'Complete beard care kit with balm, oil, comb and scissors. Keeps your beard soft, shiny and well-groomed.' },
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('shopeasy_cart') || '[]');
let currentPage = 'home';
let activeCategory = 'all';
let sortOrder = 'default';
let searchQuery = '';
let currentProduct = null;
let selectedPayMethod = 'card';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderProducts();
  showPage('home');

  // GTM: page_view on load
  pushGTM('page_view', {
    page_title: 'Home',
    page_location: window.location.href,
  });
});

// ===== PAGE ROUTING =====
function showPage(page) {
  ['home', 'cart', 'checkout', 'thankyou', 'product'].forEach(p => {
    document.getElementById(`page-${p}`).classList.add('hidden');
  });
  document.getElementById(`page-${page}`).classList.remove('hidden');
  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'cart') renderCart();
  if (page === 'checkout') renderCheckout();

  // GTM: page view for each virtual page
  const pageTitles = { home: 'Home', cart: 'Cart', checkout: 'Checkout', thankyou: 'Thank You', product: 'Product Detail' };
  pushGTM('page_view', { page_title: pageTitles[page], virtual_page: page });
}

// ===== PRODUCT RENDERING =====
function getFilteredProducts() {
  let list = [...products];
  if (activeCategory !== 'all') list = list.filter(p => p.cat === activeCategory);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.includes(q));
  }
  if (sortOrder === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sortOrder === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sortOrder === 'rating') list.sort((a, b) => b.rating - a.rating);
  return list;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const list = getFilteredProducts();
  document.getElementById('productCount').textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--gray-400)">
      <div style="font-size:48px;margin-bottom:12px">🔍</div>
      <h3 style="color:var(--gray-600);margin-bottom:8px">No products found</h3>
      <p>Try a different search term or category</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap">
        <div class="product-img" onclick="openProduct(${p.id})">${p.emoji}</div>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <div class="product-cat">${catLabel(p.cat)}</div>
        <div class="product-name" onclick="openProduct(${p.id})">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${starsHtml(p.rating)}</span>
          <span class="rating-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price">
          <span class="price-main">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="price-original">₹${p.original.toLocaleString('en-IN')}</span>
          <span class="price-discount">${discount(p.original, p.price)}% off</span>
        </div>
      </div>
      <div class="product-actions">
        <button class="btn-atc" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn-view" onclick="openProduct(${p.id})">View</button>
      </div>
    </div>
  `).join('');

  // GTM: view_item_list
  pushGTM('view_item_list', {
    item_list_name: activeCategory === 'all' ? 'All Products' : catLabel(activeCategory),
    items: list.slice(0, 10).map(p => gtmItem(p)),
  });
}

function filterCategory(cat) {
  activeCategory = cat;
  searchQuery = '';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.pill').forEach(p => {
    p.classList.toggle('active', p.dataset.cat === cat);
  });
  renderProducts();
  if (currentPage !== 'home') showPage('home');
  scrollToProducts();

  pushGTM('category_filter', { category: cat });
}

function sortProducts(val) {
  sortOrder = val;
  renderProducts();
}

function handleSearch(val) {
  searchQuery = val;
  renderProducts();
  if (val.length > 2) pushGTM('search', { search_term: val });
}

function scrollToProducts() {
  document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
}

// ===== PRODUCT DETAIL =====
function openProduct(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;
  const p = currentProduct;

  document.getElementById('productDetailContent').innerHTML = `
    <div class="detail-img-wrap">${p.emoji}</div>
    <div class="detail-info">
      <div class="detail-cat">${catLabel(p.cat)}</div>
      <h1 class="detail-name">${p.name}</h1>
      <div class="detail-rating">
        <span class="stars" style="font-size:16px">${starsHtml(p.rating)}</span>
        <span style="color:var(--gray-500);font-size:13px">${p.rating} (${p.reviews.toLocaleString()} reviews)</span>
      </div>
      <div class="detail-price">
        <span class="detail-price-main">₹${p.price.toLocaleString('en-IN')}</span>
        <span class="price-original">₹${p.original.toLocaleString('en-IN')}</span>
        <span class="price-discount">${discount(p.original, p.price)}% off</span>
      </div>
      <p class="detail-desc">${p.desc}</p>
      <div class="detail-actions">
        <button class="btn btn-primary btn-lg" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
        <button class="btn btn-outline btn-lg" onclick="addToCart(${p.id}); showPage('cart')">Buy Now</button>
      </div>
    </div>
  `;
  showPage('product');

  // GTM: view_item
  pushGTM('view_item', {
    currency: 'INR',
    value: p.price,
    items: [gtmItem(p)],
  });
}

// ===== CART =====
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...p, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`✅ ${p.name} added to cart!`);

  // GTM: add_to_cart
  pushGTM('add_to_cart', {
    currency: 'INR',
    value: p.price,
    item_name: p.name,
    item_category: p.cat,
    items: [gtmItem(p, 1)],
  });
}

function removeFromCart(id) {
  const p = cart.find(x => x.id === id);
  cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCartBadge();
  renderCart();
  showToast('🗑️ Item removed from cart');

  if (p) {
    pushGTM('remove_from_cart', {
      currency: 'INR',
      value: p.price * p.qty,
      item_name: p.name,
      items: [gtmItem(p, p.qty)],
    });
  }
}

function updateQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);
  saveCart();
  updateCartBadge();
  renderCart();
}

function saveCart() {
  localStorage.setItem('shopeasy_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = total;
}

function cartTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const originalTotal = cart.reduce((s, i) => s + i.original * i.qty, 0);
  const savings = originalTotal - subtotal;
  const delivery = subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;
  return { subtotal, savings, delivery, total };
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  if (!container || !summary) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
        <button class="btn btn-primary" onclick="showPage('home')">Browse Products</button>
      </div>`;
    summary.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${catLabel(item.cat)}</div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');

  const { subtotal, savings, delivery, total } = cartTotals();
  summary.innerHTML = `
    <div class="summary-title">Order Summary</div>
    <div class="summary-row"><span>Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} items)</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
    <div class="summary-row"><span>You Save</span><span class="summary-discount">−₹${savings.toLocaleString('en-IN')}</span></div>
    <div class="summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:var(--green)">FREE</span>' : `₹${delivery}`}</span></div>
    <hr class="summary-divider"/>
    <div class="summary-total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
    <button class="btn btn-primary" style="width:100%;margin-top:4px" onclick="proceedToCheckout()">Proceed to Checkout →</button>
    <button class="btn btn-outline" style="width:100%;margin-top:10px" onclick="showPage('home')">Continue Shopping</button>
  `;

  // GTM: view_cart
  pushGTM('view_cart', {
    currency: 'INR',
    value: total,
    items: cart.map(i => gtmItem(i, i.qty)),
  });
}

function proceedToCheckout() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  showPage('checkout');

  const { total } = cartTotals();
  pushGTM('begin_checkout', {
    currency: 'INR',
    value: total,
    items: cart.map(i => gtmItem(i, i.qty)),
  });
}

// ===== CHECKOUT =====
function renderCheckout() {
  const summary = document.getElementById('checkoutSummary');
  if (!summary) return;
  const { subtotal, savings, delivery, total } = cartTotals();
  summary.innerHTML = `
    <div class="summary-title">Your Order</div>
    ${cart.map(i => `
      <div class="summary-row">
        <span>${i.emoji} ${i.name} ×${i.qty}</span>
        <span>₹${(i.price*i.qty).toLocaleString('en-IN')}</span>
      </div>`).join('')}
    <div class="summary-row"><span>Savings</span><span class="summary-discount">−₹${savings.toLocaleString('en-IN')}</span></div>
    <div class="summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:var(--green)">FREE</span>' : `₹${delivery}`}</span></div>
    <hr class="summary-divider"/>
    <div class="summary-total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
    <button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="placeOrder()">💳 Place Order</button>
    <p style="font-size:11.5px;color:var(--gray-400);text-align:center;margin-top:8px">🔒 100% Secure Payment</p>
  `;

  // GTM: checkout_step
  pushGTM('checkout_step', { step: 1, step_name: 'Delivery & Payment' });
}

function selectPayMethod(method) {
  selectedPayMethod = method;
  document.querySelectorAll('.pay-method').forEach(el => el.classList.remove('active'));
  document.getElementById(`pm-${method}`).classList.add('active');
  ['card-fields', 'upi-fields', 'cod-fields'].forEach(f => document.getElementById(f)?.classList.add('hidden'));
  document.getElementById(`${method}-fields`)?.classList.remove('hidden');

  pushGTM('payment_method_selected', { payment_method: method });
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.match(/.{1,4}/g)?.join(' ') || v;
}

function placeOrder() {
  // Basic validation
  const firstName = document.getElementById('firstName')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  if (!firstName) { showToast('⚠️ Please enter your name'); return; }
  if (!phone) { showToast('⚠️ Please enter your phone number'); return; }

  if (selectedPayMethod === 'card') {
    const cardNum = document.getElementById('cardNum')?.value.replace(/\s/g, '');
    if (cardNum.length < 16) { showToast('⚠️ Please enter valid card number'); return; }
  }
  if (selectedPayMethod === 'upi') {
    const upi = document.getElementById('upiId')?.value.trim();
    if (!upi || !upi.includes('@')) { showToast('⚠️ Please enter valid UPI ID'); return; }
  }

  const { total } = cartTotals();
  const orderId = 'SE' + Date.now().toString().slice(-8);
  const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  const payLabels = { card: 'Credit/Debit Card', upi: 'UPI', cod: 'Cash on Delivery' };

  // GTM: purchase
  pushGTM('purchase', {
    transaction_id: orderId,
    currency: 'INR',
    value: total,
    payment_type: selectedPayMethod,
    items: cart.map(i => gtmItem(i, i.qty)),
  });

  // Fill thank you page
  document.getElementById('tyOrderId').textContent = orderId;
  document.getElementById('tyPayment').textContent = payLabels[selectedPayMethod];
  document.getElementById('tyAmount').textContent = `₹${total.toLocaleString('en-IN')}`;
  document.getElementById('tyDelivery').textContent = deliveryDate;

  // Clear cart
  cart = [];
  saveCart();
  updateCartBadge();

  showPage('thankyou');
}

function continueShopping() {
  showPage('home');
  pushGTM('continue_shopping', { from: 'thank_you' });
}

// ===== HELPERS =====
function starsHtml(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function catLabel(cat) {
  return { electronics: 'Electronics', fashion: 'Fashion', home: 'Home & Kitchen', books: 'Books', beauty: 'Beauty' }[cat] || cat;
}

function discount(orig, price) {
  return Math.round((1 - price / orig) * 100);
}

function gtmItem(p, qty = 1) {
  return {
    item_id: String(p.id),
    item_name: p.name,
    item_category: p.cat,
    price: p.price,
    quantity: qty,
    discount: p.original - p.price,
    currency: 'INR',
  };
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
