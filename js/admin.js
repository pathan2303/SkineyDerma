// SkinNey Admin Dashboard — Static demo logic

let appointments = [
  { id: 1, patient: 'Rahul S.', service: 'GFC Therapy', doctor: 'Dr. Ananya Mehta', date: '2026-10-28', time: '11:00 AM', status: 'confirmed' },
  { id: 2, patient: 'Priya M.', service: 'Lip Blush', doctor: 'Dr. Priya Shah', date: '2026-10-28', time: '2:00 PM', status: 'pending' },
  { id: 3, patient: 'Amit K.', service: 'PRP Hair', doctor: 'Dr. Ananya Mehta', date: '2026-10-29', time: '10:00 AM', status: 'confirmed' },
  { id: 4, patient: 'Sneha R.', service: 'MNRF', doctor: 'Dr. Rohan Kapoor', date: '2026-10-29', time: '3:30 PM', status: 'pending' },
  { id: 5, patient: 'Vikram T.', service: 'Laser Hair', doctor: 'Dr. Rohan Kapoor', date: '2026-10-30', time: '12:30 PM', status: 'confirmed' },
  { id: 6, patient: 'Neha P.', service: 'Microblading', doctor: 'Dr. Priya Shah', date: '2026-10-30', time: '5:00 PM', status: 'pending' },
  { id: 7, patient: 'Karan D.', service: 'Chemical Peel', doctor: 'Dr. Rohan Kapoor', date: '2026-10-31', time: '11:00 AM', status: 'cancelled' }
];

let inventory = [
  { id: 'p1', name: 'Growth Serum', cat: 'Hair', price: 1899, stock: 42 },
  { id: 'p2', name: 'Scalp Elixir', cat: 'Hair', price: 1499, stock: 28 },
  { id: 'p3', name: 'Vitamin C Serum', cat: 'Skin', price: 1299, stock: 55 },
  { id: 'p4', name: 'Hydrating Cream', cat: 'Skin', price: 999, stock: 61 },
  { id: 'p5', name: 'SPF 50 Sunscreen', cat: 'Skin', price: 799, stock: 80 },
  { id: 'p6', name: 'Peptide Night Cream', cat: 'Skin', price: 1699, stock: 19 },
  { id: 'p7', name: 'Hair Growth Capsules', cat: 'Hair', price: 1199, stock: 34 },
  { id: 'p8', name: 'Aftercare Kit', cat: 'Kits', price: 2499, stock: 12 }
];

// Login
document.getElementById('admin-login-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('admin-login').classList.add('hidden');
  document.getElementById('admin-app').classList.remove('hidden');
  renderAppointments();
  renderInventory();
  toast('Welcome, Admin');
});

document.getElementById('logout-btn').addEventListener('click', () => {
  document.getElementById('admin-app').classList.add('hidden');
  document.getElementById('admin-login').classList.remove('hidden');
});

// Panels
function showPanel(name) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById('panel-' + name).classList.remove('hidden');
  document.querySelectorAll('.admin-nav').forEach(btn => {
    const active = btn.dataset.panel === name;
    btn.classList.toggle('active', active);
    btn.classList.toggle('bg-gold/15', active);
    btn.classList.toggle('text-gold', active);
    btn.classList.toggle('text-ivory/60', !active);
  });
}
window.showPanel = showPanel;

document.querySelectorAll('.admin-nav').forEach(btn => {
  btn.addEventListener('click', () => showPanel(btn.dataset.panel));
});

// Appointments
function renderAppointments(filter = 'all') {
  const tbody = document.getElementById('appt-tbody');
  const list = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);
  tbody.innerHTML = list.map(a => `
    <tr class="border-t border-white/5 hover:bg-white/[0.02]">
      <td class="px-4 py-3 font-medium">${a.patient}</td>
      <td class="px-4 py-3 text-ivory/70">${a.service}</td>
      <td class="px-4 py-3 text-ivory/70">${a.doctor}</td>
      <td class="px-4 py-3 text-ivory/70">${a.date}<br><span class="text-xs">${a.time}</span></td>
      <td class="px-4 py-3">
        <span class="text-xs px-2 py-1 rounded-full ${
          a.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
          a.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
          'bg-red-500/20 text-red-400'
        }">${a.status}</span>
      </td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          ${a.status === 'pending' ? `<button onclick="setStatus(${a.id},'confirmed')" class="text-xs text-gold hover:underline">Approve</button>` : ''}
          ${a.status !== 'cancelled' ? `<button onclick="setStatus(${a.id},'cancelled')" class="text-xs text-ivory/40 hover:text-red-400">Cancel</button>` : ''}
          ${a.status === 'cancelled' ? `<button onclick="setStatus(${a.id},'pending')" class="text-xs text-ivory/40 hover:text-gold">Restore</button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
  document.getElementById('stat-pending').textContent = appointments.filter(a => a.status === 'pending').length;
}

window.setStatus = function(id, status) {
  const a = appointments.find(x => x.id === id);
  if (a) a.status = status;
  renderAppointments(document.getElementById('appt-filter').value);
  toast('Appointment updated');
};

document.getElementById('appt-filter').addEventListener('change', e => {
  renderAppointments(e.target.value);
});

// Inventory
function renderInventory() {
  document.getElementById('inv-tbody').innerHTML = inventory.map(p => `
    <tr class="border-t border-white/5 hover:bg-white/[0.02]">
      <td class="px-4 py-3 font-medium">${p.name}</td>
      <td class="px-4 py-3 text-ivory/60">${p.cat}</td>
      <td class="px-4 py-3">₹${p.price}</td>
      <td class="px-4 py-3">
        <span class="${p.stock < 20 ? 'text-amber-400' : ''}">${p.stock}</span>
      </td>
      <td class="px-4 py-3">
        <button onclick="editProduct('${p.id}')" class="text-xs text-gold hover:underline mr-2">Edit</button>
        <button onclick="deleteProduct('${p.id}')" class="text-xs text-ivory/40 hover:text-red-400">Delete</button>
      </td>
    </tr>
  `).join('');
}

const modal = document.getElementById('product-modal');
document.getElementById('add-product-btn').addEventListener('click', () => {
  document.getElementById('modal-title').textContent = 'Add Product';
  document.getElementById('edit-id').value = '';
  document.getElementById('prod-name').value = '';
  document.getElementById('prod-cat').value = '';
  document.getElementById('prod-price').value = '';
  document.getElementById('prod-stock').value = '';
  modal.classList.add('open');
});

window.editProduct = function(id) {
  const p = inventory.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-title').textContent = 'Edit Product';
  document.getElementById('edit-id').value = p.id;
  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-cat').value = p.cat;
  document.getElementById('prod-price').value = p.price;
  document.getElementById('prod-stock').value = p.stock;
  modal.classList.add('open');
};

window.deleteProduct = function(id) {
  inventory = inventory.filter(x => x.id !== id);
  renderInventory();
  toast('Product removed');
};

document.getElementById('modal-cancel').addEventListener('click', () => modal.classList.remove('open'));
document.getElementById('product-form').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const data = {
    name: document.getElementById('prod-name').value,
    cat: document.getElementById('prod-cat').value,
    price: +document.getElementById('prod-price').value,
    stock: +document.getElementById('prod-stock').value
  };
  if (id) {
    const p = inventory.find(x => x.id === id);
    Object.assign(p, data);
  } else {
    inventory.push({ id: 'p' + Date.now(), ...data });
  }
  modal.classList.remove('open');
  renderInventory();
  toast('Product saved');
});

// CMS forms
document.getElementById('video-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.querySelector('input').value;
  document.getElementById('cms-list').insertAdjacentHTML('afterbegin', `<li>• ${title} — published</li>`);
  e.target.reset();
  toast('Video published');
});
document.getElementById('ba-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('cms-list').insertAdjacentHTML('afterbegin', `<li>• New before/after case — gallery</li>`);
  e.target.reset();
  toast('Gallery item added');
});

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
// SkinNey Admin Dashboard — Static demo logic

let appointments = [
  { id: 1, patient: 'Rahul S.', service: 'GFC Therapy', doctor: 'Dr. Ananya Mehta', date: '2026-10-28', time: '11:00 AM', status: 'confirmed' },
  { id: 2, patient: 'Priya M.', service: 'Lip Blush', doctor: 'Dr. Priya Shah', date: '2026-10-28', time: '2:00 PM', status: 'pending' },
  { id: 3, patient: 'Amit K.', service: 'PRP Hair', doctor: 'Dr. Ananya Mehta', date: '2026-10-29', time: '10:00 AM', status: 'confirmed' },
  { id: 4, patient: 'Sneha R.', service: 'MNRF', doctor: 'Dr. Rohan Kapoor', date: '2026-10-29', time: '3:30 PM', status: 'pending' },
  { id: 5, patient: 'Vikram T.', service: 'Laser Hair', doctor: 'Dr. Rohan Kapoor', date: '2026-10-30', time: '12:30 PM', status: 'confirmed' },
  { id: 6, patient: 'Neha P.', service: 'Microblading', doctor: 'Dr. Priya Shah', date: '2026-10-30', time: '5:00 PM', status: 'pending' },
  { id: 7, patient: 'Karan D.', service: 'Chemical Peel', doctor: 'Dr. Rohan Kapoor', date: '2026-10-31', time: '11:00 AM', status: 'cancelled' }
];

let inventory = [
  { id: 'p1', name: 'Growth Serum', cat: 'Hair', price: 1899, stock: 42 },
  { id: 'p2', name: 'Scalp Elixir', cat: 'Hair', price: 1499, stock: 28 },
  { id: 'p3', name: 'Vitamin C Serum', cat: 'Skin', price: 1299, stock: 55 },
  { id: 'p4', name: 'Hydrating Cream', cat: 'Skin', price: 999, stock: 61 },
  { id: 'p5', name: 'SPF 50 Sunscreen', cat: 'Skin', price: 799, stock: 80 },
  { id: 'p6', name: 'Peptide Night Cream', cat: 'Skin', price: 1699, stock: 19 },
  { id: 'p7', name: 'Hair Growth Capsules', cat: 'Hair', price: 1199, stock: 34 },
  { id: 'p8', name: 'Aftercare Kit', cat: 'Kits', price: 2499, stock: 12 }
];

// Login
document.getElementById('admin-login-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('admin-login').classList.add('hidden');
  document.getElementById('admin-app').classList.remove('hidden');
  renderAppointments();
  renderInventory();
  toast('Welcome, Admin');
});

document.getElementById('logout-btn').addEventListener('click', () => {
  document.getElementById('admin-app').classList.add('hidden');
  document.getElementById('admin-login').classList.remove('hidden');
});

// Panels
function showPanel(name) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById('panel-' + name).classList.remove('hidden');
  document.querySelectorAll('.admin-nav').forEach(btn => {
    const active = btn.dataset.panel === name;
    btn.classList.toggle('active', active);
    btn.classList.toggle('bg-gold/15', active);
    btn.classList.toggle('text-gold', active);
    btn.classList.toggle('text-ivory/60', !active);
  });
}
window.showPanel = showPanel;

document.querySelectorAll('.admin-nav').forEach(btn => {
  btn.addEventListener('click', () => showPanel(btn.dataset.panel));
});

// Appointments
function renderAppointments(filter = 'all') {
  const tbody = document.getElementById('appt-tbody');
  const list = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);
  tbody.innerHTML = list.map(a => `
    <tr class="border-t border-white/5 hover:bg-white/[0.02]">
      <td class="px-4 py-3 font-medium">${a.patient}</td>
      <td class="px-4 py-3 text-ivory/70">${a.service}</td>
      <td class="px-4 py-3 text-ivory/70">${a.doctor}</td>
      <td class="px-4 py-3 text-ivory/70">${a.date}<br><span class="text-xs">${a.time}</span></td>
      <td class="px-4 py-3">
        <span class="text-xs px-2 py-1 rounded-full ${
          a.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
          a.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
          'bg-red-500/20 text-red-400'
        }">${a.status}</span>
      </td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          ${a.status === 'pending' ? `<button onclick="setStatus(${a.id},'confirmed')" class="text-xs text-gold hover:underline">Approve</button>` : ''}
          ${a.status !== 'cancelled' ? `<button onclick="setStatus(${a.id},'cancelled')" class="text-xs text-ivory/40 hover:text-red-400">Cancel</button>` : ''}
          ${a.status === 'cancelled' ? `<button onclick="setStatus(${a.id},'pending')" class="text-xs text-ivory/40 hover:text-gold">Restore</button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
  document.getElementById('stat-pending').textContent = appointments.filter(a => a.status === 'pending').length;
}

window.setStatus = function(id, status) {
  const a = appointments.find(x => x.id === id);
  if (a) a.status = status;
  renderAppointments(document.getElementById('appt-filter').value);
  toast('Appointment updated');
};

document.getElementById('appt-filter').addEventListener('change', e => {
  renderAppointments(e.target.value);
});

// Inventory
function renderInventory() {
  document.getElementById('inv-tbody').innerHTML = inventory.map(p => `
    <tr class="border-t border-white/5 hover:bg-white/[0.02]">
      <td class="px-4 py-3 font-medium">${p.name}</td>
      <td class="px-4 py-3 text-ivory/60">${p.cat}</td>
      <td class="px-4 py-3">₹${p.price}</td>
      <td class="px-4 py-3">
        <span class="${p.stock < 20 ? 'text-amber-400' : ''}">${p.stock}</span>
      </td>
      <td class="px-4 py-3">
        <button onclick="editProduct('${p.id}')" class="text-xs text-gold hover:underline mr-2">Edit</button>
        <button onclick="deleteProduct('${p.id}')" class="text-xs text-ivory/40 hover:text-red-400">Delete</button>
      </td>
    </tr>
  `).join('');
}

const modal = document.getElementById('product-modal');
document.getElementById('add-product-btn').addEventListener('click', () => {
  document.getElementById('modal-title').textContent = 'Add Product';
  document.getElementById('edit-id').value = '';
  document.getElementById('prod-name').value = '';
  document.getElementById('prod-cat').value = '';
  document.getElementById('prod-price').value = '';
  document.getElementById('prod-stock').value = '';
  modal.classList.add('open');
});

window.editProduct = function(id) {
  const p = inventory.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-title').textContent = 'Edit Product';
  document.getElementById('edit-id').value = p.id;
  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-cat').value = p.cat;
  document.getElementById('prod-price').value = p.price;
  document.getElementById('prod-stock').value = p.stock;
  modal.classList.add('open');
};

window.deleteProduct = function(id) {
  inventory = inventory.filter(x => x.id !== id);
  renderInventory();
  toast('Product removed');
};

document.getElementById('modal-cancel').addEventListener('click', () => modal.classList.remove('open'));
document.getElementById('product-form').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const data = {
    name: document.getElementById('prod-name').value,
    cat: document.getElementById('prod-cat').value,
    price: +document.getElementById('prod-price').value,
    stock: +document.getElementById('prod-stock').value
  };
  if (id) {
    const p = inventory.find(x => x.id === id);
    Object.assign(p, data);
  } else {
    inventory.push({ id: 'p' + Date.now(), ...data });
  }
  modal.classList.remove('open');
  renderInventory();
  toast('Product saved');
});

// CMS forms
document.getElementById('video-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.querySelector('input').value;
  document.getElementById('cms-list').insertAdjacentHTML('afterbegin', `<li>• ${title} — published</li>`);
  e.target.reset();
  toast('Video published');
});
document.getElementById('ba-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('cms-list').insertAdjacentHTML('afterbegin', `<li>• New before/after case — gallery</li>`);
  e.target.reset();
  toast('Gallery item added');
});

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
