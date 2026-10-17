/* ==========================================================================
   UI Interactions: Role Focus Switcher, 3D Card Tilt, Modals & HUD Controls
   ========================================================================== */
window.setRoleLens = function(role) {
  const configs = window.ROLE_CONFIGS || {};
  if (!configs[role]) role = 'fullstack';
  window.currentRole = role;

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });

  const cfg = configs[role];
  const eyebrowEl = document.getElementById('hero-eyebrow');
  const highlightEl = document.getElementById('hero-highlight');
  const leadEl = document.getElementById('hero-lead');
  const indicatorEl = document.getElementById('active-lens-indicator');

  if (eyebrowEl) eyebrowEl.textContent = cfg.eyebrow;
  if (highlightEl) highlightEl.textContent = cfg.highlight;
  if (leadEl) leadEl.innerHTML = cfg.lead;
  if (indicatorEl) indicatorEl.textContent = `FOCUS: ${cfg.label}`;

  document.querySelectorAll('.skill-tag').forEach(tag => {
    const roles = (tag.dataset.skillRole || '').split(',');
    tag.classList.toggle('active-role-skill', roles.includes(role));
  });

  document.querySelectorAll('.projects-grid .tilt-card').forEach(card => {
    const roles = (card.dataset.roles || '').split(',');
    card.classList.toggle('role-match', roles.includes(role));
  });
};

window.copyText = function(text, msg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  }
  window.showToast(msg || 'Copied to clipboard!');
};

window.showToast = function(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
};

window.openArchModal = function(key) {
  const blueprints = window.ARCH_BLUEPRINTS || {};
  const data = blueprints[key];
  if (!data) return;
  document.getElementById('archModalTag').textContent = data.tag;
  document.getElementById('archModalTitle').textContent = data.title;
  document.getElementById('archModalContent').innerHTML = data.html;
  document.getElementById('archModal').classList.add('open');
};

window.closeArchModal = function() {
  const modal = document.getElementById('archModal');
  if (modal) modal.classList.remove('open');
};

window.toggleAutoOrbit = function() {
  if (!window.sceneState) return;
  window.sceneState.autoOrbit = !window.sceneState.autoOrbit;
  const btn = document.getElementById('btnAutoOrbit');
  if (btn) {
    btn.textContent = `Orbit: ${window.sceneState.autoOrbit ? 'ON' : 'OFF'}`;
    btn.classList.toggle('active', window.sceneState.autoOrbit);
  }
};

window.toggleWireframe = function() {
  if (!window.sceneState) return;
  window.sceneState.wireframeOnly = !window.sceneState.wireframeOnly;
  const btn = document.getElementById('btnWireframe');
  if (btn) {
    btn.textContent = `Mode: ${window.sceneState.wireframeOnly ? 'Wireframe' : 'Solid+Wire'}`;
    btn.classList.toggle('active', window.sceneState.wireframeOnly);
  }
};

window.pulseWarp = function() {
  if (window.sceneState) {
    window.sceneState.warpBoost = 1.0;
  }
};

window.toggleFreeLook = function() {
  document.body.classList.toggle('freelook-mode');
  const active = document.body.classList.contains('freelook-mode');
  const btn = document.getElementById('btnFreeLook');
  if (btn) {
    btn.textContent = active ? 'Exit 3D Free-Look' : '3D Free-Look';
    btn.classList.toggle('active', active);
  }
};
