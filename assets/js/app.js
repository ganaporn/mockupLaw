// ============================================================
// App JS - Shared Components & Init
// ============================================================

// ─── Build Sidebar ──────────────────────────────────────────
function buildSidebar(activePage) {
  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '../index.html', key: 'dashboard' },
    {
      type: 'group', icon: '⚖️', label: 'งานคดี', key: 'legal-group',
      children: [
        { icon: '📥', label: 'คำขอสร้างคดี',           href: 'case-request.html',               key: 'request',     badge: 3 },
        { icon: '📁', label: 'รายการคดีทั้งหมด',    href: 'case-list.html',                  key: 'cases' },
        { icon: '🔍', label: 'กลุ่มงานคดี',            href: 'case-list.html?filter=review',    key: 'review',      badge: 12 },
        { icon: '📋', label: 'เตรียมคดี',           href: 'case-list.html?stage=PREPARE',    key: 'prepare' },
        { icon: '⚖️', label: 'งานคดี',              href: 'case-list.html?stage=LITIGATION', key: 'litigation' },
        { icon: '🏛️', label: 'บังคับคดี',           href: 'case-list.html?stage=ENFORCEMENT',key: 'enforce' }
      ]
    },
    { type: 'section', label: 'ระบบ' },
    { icon: '📈', label: 'รายงาน',         href: '#',                    key: 'report' },
    { icon: '🗺️', label: 'ER Diagram',     href: 'er-diagram.html',      key: 'er' },
    { icon: '🔬', label: 'DB Analysis',    href: 'db-analysis.html',     key: 'dbanalysis' },
    { icon: '📖', label: 'Data Dictionary',href: 'data-dictionary.html', key: 'dictionary' },
    { icon: '⚙️', label: 'ตั้งค่า',        href: '#',                    key: 'settings' }
  ];

  let html = `
  <div class="sidebar-brand">
    <div class="brand-icon">🚌</div>
    <div class="brand-text">
      <div class="brand-title">ขสมก.</div>
      <div class="brand-sub">ระบบติดตามคดี</div>
    </div>
  </div>
  <nav class="sidebar-nav">`;

  navItems.forEach(item => {
    if (item.type === 'section') {
      html += `<div class="sidebar-section">${item.label}</div>`;
    } else if (item.type === 'group') {
      const childActive = item.children.some(c => c.key === activePage);
      const collapsedClass = childActive ? '' : '';  // always open in mockup
      html += `<div class="nav-group-toggle ${collapsedClass}" onclick="
        this.classList.toggle('collapsed');
        this.nextElementSibling.classList.toggle('hidden');
      ">
        <span class="nav-icon">${item.icon}</span>
        <span>${item.label}</span>
        <span class="nav-group-chevron">▾</span>
      </div>
      <div class="nav-group-children">`;
      item.children.forEach(child => {
        if (child.type === 'sub-section') {
          html += `<div class="nav-sub-section">${child.label}</div>`;
        } else {
          const active = child.key === activePage ? 'active' : '';
          const badge = child.badge ? `<span class="badge-count">${child.badge}</span>` : '';
          html += `<li class="nav-item">
            <a class="nav-link-side nav-link-sub ${active}" href="${child.href}">
              <span class="nav-icon">${child.icon}</span>
              <span>${child.label}</span>${badge}
            </a></li>`;
        }
      });
      html += `</div>`;
    } else {
      const active = item.key === activePage ? 'active' : '';
      const badge = item.badge ? `<span class="badge-count">${item.badge}</span>` : '';
      html += `<li class="nav-item">
        <a class="nav-link-side ${active}" href="${item.href}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>${badge}
        </a></li>`;
    }
  });

  html += `</nav>
  <div style="padding:12px 20px;border-top:1px solid rgba(255,255,255,.1);font-size:11px;opacity:.5;text-align:center;">
    v1.0 &bull; กลุ่มงานคดี ขสมก.
  </div>`;
  return html;
}

// ─── Build Topbar ────────────────────────────────────────────
function buildTopbar(breadcrumb, title) {
  return `
  <div class="topbar-breadcrumb">${breadcrumb} &rsaquo; <span>${title}</span></div>
  <div class="topbar-actions">
    <button class="topbar-btn" title="แจ้งเตือน">
      🔔<span class="topbar-notif-dot"></span>
    </button>
    <div class="topbar-user">
      <div class="topbar-avatar">สน</div>
      <div>
        <div class="topbar-user-name">น.ส.สุนิตรา ภูวา</div>
        <div class="topbar-user-role">นิติกร · กลุ่มงานคดี</div>
      </div>
    </div>
  </div>`;
}

// ─── Tabs Controller ─────────────────────────────────────────
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ─── Modal ───────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
window.openModal = openModal;
window.closeModal = closeModal;

// ─── Format ──────────────────────────────────────────────────
function fmtDate(d) {
  if (!d) return '-';
  const dt = new Date(d);
  return dt.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
}

function fmtMoney(n) {
  if (n == null) return '-';
  return Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2 }) + ' บาท';
}

// ─── Custom Select (Chrome font fix) ────────────────────────
// Native <select> dropdown ignores CSS font in Chrome; replace with div-based UI
function initCustomSelects() {
  document.querySelectorAll('select:not([data-cs])').forEach(sel => {
    sel.setAttribute('data-cs', '1');

    const wrap = document.createElement('div');
    wrap.className = 'cs-wrap';
    if (sel.style.minWidth) wrap.style.minWidth = sel.style.minWidth;
    if (sel.style.width) wrap.style.width = sel.style.width;
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);
    sel.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none;';

    const display = document.createElement('div');
    display.className = 'cs-display form-control';
    display.tabIndex = 0;
    wrap.insertBefore(display, sel);

    const dropdown = document.createElement('div');
    dropdown.className = 'cs-dropdown';
    wrap.appendChild(dropdown);

    function getText() {
      const i = sel.selectedIndex;
      return (i >= 0 && sel.options[i]) ? sel.options[i].text : '';
    }

    function build() {
      display.innerHTML = `<span class="cs-val">${getText()}</span><span class="cs-arrow">&#9660;</span>`;
      dropdown.innerHTML = '';
      Array.from(sel.children).forEach(node => {
        if (node.tagName === 'OPTGROUP') {
          const g = document.createElement('div');
          g.className = 'cs-group';
          g.textContent = node.label;
          dropdown.appendChild(g);
          Array.from(node.children).forEach(o => addOpt(o));
        } else {
          addOpt(node);
        }
      });
    }

    function addOpt(o) {
      const d = document.createElement('div');
      d.className = 'cs-opt' + (o.value && o.value === sel.value ? ' cs-on' : '');
      d.textContent = o.text;
      if (o.disabled) {
        d.classList.add('cs-dim');
        dropdown.appendChild(d);
        return;
      }
      d.addEventListener('mousedown', e => {
        e.preventDefault();
        sel.value = o.value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        build();
        wrap.classList.remove('open');
      });
      dropdown.appendChild(d);
    }

    build();

    display.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.cs-wrap.open').forEach(w => { if (w !== wrap) w.classList.remove('open'); });
      wrap.classList.toggle('open');
    });
    display.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { display.click(); e.preventDefault(); }
      if (e.key === 'Escape') wrap.classList.remove('open');
    });
    document.addEventListener('click', () => wrap.classList.remove('open'));
    sel.addEventListener('change', build);
  });
}
window.initCustomSelects = initCustomSelects;

// ─── Page Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el) el.classList.remove('open');
    });
  });
  // Init custom selects after all page scripts have run
  setTimeout(initCustomSelects, 0);
});
