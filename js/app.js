// SkinNey Patient App — Client-side logic (static demo)

const TREATMENTS = [
  { id: 'prp', name: 'PRP Hair Therapy', cat: 'hair', price: 8999, duration: '60–75 min', desc: 'Platelet-rich plasma for natural hair regrowth.' },
  { id: 'gfc', name: 'GFC Therapy', cat: 'hair', price: 12999, duration: '75–90 min', desc: 'Growth Factor Concentrate for superior density.' },
  { id: 'prp-face', name: 'PRP Vampire Facial', cat: 'skin', price: 9999, duration: '60 min', desc: 'Facial rejuvenation with your own growth factors.' },
  { id: 'peel', name: 'Chemical Peel', cat: 'skin', price: 3499, duration: '30–45 min', desc: 'Customised peels for pigmentation & texture.' },
  { id: 'mnrf', name: 'MNRF (Microneedling RF)', cat: 'skin', price: 7999, duration: '45–60 min', desc: 'Radiofrequency microneedling for scars & tightening.' },
  { id: 'ipl', name: 'IPL Photofacial', cat: 'laser', price: 4999, duration: '30–40 min', desc: 'Intense pulsed light for pigmentation & redness.' },
  { id: 'laser-hair', name: 'Laser Hair Reduction', cat: 'laser', price: 2999, duration: '20–45 min', desc: 'Medical-grade diode laser sessions.' },
  { id: 'lip-blush', name: 'Lip Blush', cat: 'pmu', price: 9999, duration: '90–120 min', desc: 'Soft permanent lip colour enhancement.' },
  { id: 'micro', name: 'Microblading', cat: 'micro', price: 7999, duration: '120–150 min', desc: 'Hair-stroke brows for natural fullness.' },
  { id: 'micro-shade', name: 'Microshading', cat: 'micro', price: 8999, duration: '120 min', desc: 'Soft powdered brow look.' }
];

const DOCTORS = [
  { id: 'd1', name: 'Dr. Ananya Mehta', specialty: 'Hair & Trichology', exp: '8 yrs' },
  { id: 'd2', name: 'Dr. Rohan Kapoor', specialty: 'Dermatology & Laser', exp: '11 yrs' },
  { id: 'd3', name: 'Dr. Priya Shah', specialty: 'Aesthetic & PMU', exp: '6 yrs' }
];

const PRODUCTS = [
  { id: 'p1', name: 'Growth Serum', price: 1899, cat: 'Hair', img: '🧴' },
  { id: 'p2', name: 'Scalp Elixir', price: 1499, cat: 'Hair', img: '💧' },
  { id: 'p3', name: 'Vitamin C Serum', price: 1299, cat: 'Skin', img: '🍊' },
  { id: 'p4', name: 'Hydrating Cream', price: 999, cat: 'Skin', img: '✨' },
  { id: 'p5', name: 'SPF 50 Sunscreen', price: 799, cat: 'Skin', img: '☀️' },
  { id: 'p6', name: 'Peptide Night Cream', price: 1699, cat: 'Skin', img: '🌙' },
  { id: 'p7', name: 'Hair Growth Capsules', price: 1199, cat: 'Hair', img: '💊' },
  { id: 'p8', name: 'Aftercare Kit', price: 2499, cat: 'Kits', img: '🎁' }
];

const SLOTS = ['10:00 AM', '11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

let state = {
  user: null,
  cart: [],
  book: { service: null, doctor: null, date: null, slot: null },
  filter: 'all'
};

// ---------- Auth ----------
const authGate = document.getElementById('auth-gate');
const appShell = document.getElementById('app-shell');

document.getElementById('tab-login').addEventListener('click', () => {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('tab-login').classList.add('border-gold', 'text-gold');
  document.getElementById('tab-login').classList.remove('border-transparent', 'text-ivory/40');
  document.getElementById('tab-signup').classList.add('border-transparent', 'text-ivory/40');
  document.getElementById('tab-signup').classList.remove('border-gold', 'text-gold');
});
document.getElementById('tab-signup').addEventListener('click', () => {
  document.getElementById('signup-form').classList.remove('hidden');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('tab-signup').classList.add('border-gold', 'text-gold');
  document.getElementById('tab-signup').classList.remove('border-transparent', 'text-ivory/40');
  document.getElementById('tab-login').classList.add('border-transparent', 'text-ivory/40');
  document.getElementById('tab-login').classList.remove('border-gold', 'text-gold');
});

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value || 'Patient';
  login(email.split('@')[0] || 'Guest');
});
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  login('New Patient');
});

function login(name) {
  state.user = { name };
  localStorage.setItem('skinney_user', JSON.stringify(state.user));
  authGate.classList.add('hidden');
  appShell.classList.remove('hidden');
  document.getElementById('user-name').textContent = name;
  showView(location.hash.replace('#', '') || 'home');
  toast('Welcome to SkinNey');
}

// Restore session
const saved = localStorage.getItem('skinney_user');
if (saved) {
  try {
    state.user = JSON.parse(saved);
    authGate.classList.add('hidden');
    appShell.classList.remove('hidden');
    document.getElementById('user-name').textContent = state.user.name;
  } catch {}
}

// ---------- Navigation ----------
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById('view-' + name);
  if (el) el.classList.remove('hidden');
  document.querySelectorAll('.app-nav-btn').forEach(btn => {
    const isActive = btn.dataset.view === name;
    btn.classList.toggle('text-gold', isActive);
    btn.classList.toggle('bg-gold/10', isActive && btn.classList.contains('flex') && btn.closest('aside'));
    btn.classList.toggle('text-ivory/40', !isActive);
    btn.classList.toggle('text-ivory/60', !isActive);
  });
  if (name === 'treatments') renderTreatments();
  if (name === 'shop') renderProducts();
  if (name === 'book') { goBookStep(1); renderBookServices(); }
  location.hash = name;
}

document.querySelectorAll('.app-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.view));
});

window.addEventListener('hashchange', () => {
  const h = location.hash.replace('#', '');
  if (h && document.getElementById('view-' + h)) showView(h);
});

// ---------- Treatments ----------
function renderTreatments() {
  const grid = document.getElementById('treatments-grid');
  const list = state.filter === 'all' ? TREATMENTS : TREATMENTS.filter(t => t.cat === state.filter);
  grid.innerHTML = list.map(t => `
    <article class="bg-charcoal-soft border border-white/5 rounded-2xl p-5 hover:border-gold/30 transition-all">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-medium">${t.name}</h3>
        <span class="text-gold text-sm">₹${t.price.toLocaleString()}</span>
      </div>
      <p class="text-xs text-ivory/50 mb-1">${t.duration}</p>
      <p class="text-sm text-ivory/60 mb-4">${t.desc}</p>
      <button onclick="startBook('${t.id}')" class="text-xs uppercase tracking-wider text-gold hover:underline">Book this →</button>
    </article>
  `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.cat;
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
      b.classList.toggle('bg-gold', b === btn);
      b.classList.toggle('text-charcoal', b === btn);
      b.classList.toggle('border', b !== btn);
      b.classList.toggle('border-white/15', b !== btn);
      b.classList.toggle('text-ivory/60', b !== btn);
    });
    renderTreatments();
  });
});

window.startBook = function(id) {
  state.book.service = TREATMENTS.find(t => t.id === id);
  showView('book');
  goBookStep(2);
  renderBookDoctors();
};

// ---------- Booking ----------
function renderBookServices() {
  document.getElementById('book-services').innerHTML = TREATMENTS.map(t => `
    <button onclick="selectService('${t.id}')" class="w-full text-left p-4 bg-charcoal-soft border border-white/5 rounded-xl hover:border-gold/40 transition-all flex justify-between items-center">
      <div>
        <p class="font-medium">${t.name}</p>
        <p class="text-xs text-ivory/50">${t.duration}</p>
      </div>
      <span class="text-gold">₹${t.price.toLocaleString()}</span>
    </button>
  `).join('');
}

window.selectService = function(id) {
  state.book.service = TREATMENTS.find(t => t.id === id);
  goBookStep(2);
  renderBookDoctors();
};

function renderBookDoctors() {
  document.getElementById('book-doctors').innerHTML = DOCTORS.map(d => `
    <button onclick="selectDoctor('${d.id}')" class="w-full text-left p-4 bg-charcoal-soft border border-white/5 rounded-xl hover:border-gold/40 transition-all">
      <p class="font-medium">${d.name}</p>
      <p class="text-xs text-ivory/50">${d.specialty} · ${d.exp} experience</p>
    </button>
  `).join('');
}

window.selectDoctor = function(id) {
  state.book.doctor = DOCTORS.find(d => d.id === id);
  goBookStep(3);
  const dateInput = document.getElementById('book-date');
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];
  dateInput.value = today.toISOString().split('T')[0];
  renderSlots();
  dateInput.onchange = () => { state.book.date = dateInput.value; renderSlots(); };
};

function renderSlots() {
  document.getElementById('book-slots').innerHTML = SLOTS.map(s => `
    <button onclick="selectSlot('${s}')" class="slot-btn px-4 py-2 text-sm rounded-xl border border-white/15 hover:border-gold/50 hover:bg-gold/10 transition-all">${s}</button>
  `).join('');
}

window.selectSlot = function(slot) {
  state.book.slot = slot;
  state.book.date = document.getElementById('book-date').value;
  goBookStep(4);
  document.getElementById('sum-service').textContent = state.book.service.name;
  document.getElementById('sum-doctor').textContent = state.book.doctor.name;
  document.getElementById('sum-date').textContent = state.book.date;
  document.getElementById('sum-time').textContent = state.book.slot;
  document.getElementById('sum-price').textContent = '₹' + state.book.service.price.toLocaleString();
};

window.goBookStep = function(n) {
  document.querySelectorAll('.book-step').forEach(s => s.classList.add('hidden'));
  document.getElementById('book-step-' + n).classList.remove('hidden');
  for (let i = 1; i <= 4; i++) {
    const ind = document.getElementById('step-ind-' + i);
    if (i === n) {
      ind.className = 'px-3 py-1 rounded-full bg-gold text-charcoal font-medium';
    } else if (i < n) {
      ind.className = 'px-3 py-1 rounded-full bg-gold/20 text-gold';
    } else {
      ind.className = 'px-3 py-1 rounded-full bg-white/5 text-ivory/40';
    }
  }
};

document.getElementById('confirm-book-btn').addEventListener('click', () => {
  const booking = { ...state.book, id: Date.now() };
  localStorage.setItem('skinney_booking', JSON.stringify(booking));
  document.getElementById('upcoming-msg').classList.add('hidden');
  document.getElementById('upcoming-card').classList.remove('hidden');
  document.getElementById('up-service').textContent = booking.service.name;
  document.getElementById('up-when').textContent = `${booking.date} · ${booking.slot}`;
  document.getElementById('up-doctor').textContent = booking.doctor.name;
  toast('Appointment confirmed!');
  showView('home');
});

// Restore booking
const savedBooking = localStorage.getItem('skinney_booking');
if (savedBooking) {
  try {
    const b = JSON.parse(savedBooking);
    document.getElementById('upcoming-msg').classList.add('hidden');
    document.getElementById('upcoming-card').classList.remove('hidden');
    document.getElementById('up-service').textContent = b.service.name;
    document.getElementById('up-when').textContent = `${b.date} · ${b.slot}`;
    document.getElementById('up-doctor').textContent = b.doctor.name;
  } catch {}
}

// ---------- Shop & Cart ----------
function renderProducts() {
  document.getElementById('products-grid').innerHTML = PRODUCTS.map(p => `
    <article class="bg-charcoal-soft border border-white/5 rounded-2xl overflow-hidden hover:border-gold/30 transition-all">
      <div class="aspect-square flex items-center justify-center text-5xl bg-charcoal-muted">${p.img}</div>
      <div class="p-4">
        <p class="text-xs text-ivory/40 mb-1">${p.cat}</p>
        <h4 class="font-medium text-sm mb-1">${p.name}</h4>
        <div class="flex justify-between items-center">
          <span class="text-gold text-sm">₹${p.price}</span>
          <button onclick="addToCart('${p.id}')" class="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

window.addToCart = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const existing = state.cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else state.cart.push({ ...p, qty: 1 });
  updateCartUI();
  toast('Added to cart');
};

function updateCartUI() {
  const count = state.cart.reduce((s, c) => s + c.qty, 0);
  const countEl = document.getElementById('cart-count');
  if (count > 0) {
    countEl.textContent = count;
    countEl.classList.remove('hidden');
  } else countEl.classList.add('hidden');

  const items = document.getElementById('cart-items');
  if (state.cart.length === 0) {
    items.innerHTML = '<p class="text-ivory/40 text-sm text-center py-10">Cart is empty</p>';
  } else {
    items.innerHTML = state.cart.map(c => `
      <div class="flex gap-4 items-center">
        <div class="w-14 h-14 rounded-xl bg-charcoal-muted flex items-center justify-center text-2xl">${c.img}</div>
        <div class="flex-1">
          <p class="text-sm font-medium">${c.name}</p>
          <p class="text-xs text-ivory/50">₹${c.price} × ${c.qty}</p>
        </div>
        <button onclick="removeFromCart('${c.id}')" class="text-ivory/40 hover:text-red-400 text-sm">Remove</button>
      </div>
    `).join('');
  }
  const total = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cart-total').textContent = '₹' + total.toLocaleString();
}

window.removeFromCart = function(id) {
  state.cart = state.cart.filter(c => c.id !== id);
  updateCartUI();
};

document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.remove('opacity-0', 'pointer-events-none');
  updateCartUI();
});
document.getElementById('close-cart').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.add('opacity-0', 'pointer-events-none');
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (state.cart.length === 0) return toast('Cart is empty');
  toast('Order placed! (Demo only)');
  state.cart = [];
  updateCartUI();
  closeCart();
});

// ---------- Toast ----------
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// Init
if (state.user) {
  const h = location.hash.replace('#', '') || 'home';
  showView(h);
}
