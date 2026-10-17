/* ==========================================================================
   Main Application Bootstrap: Tilt Listeners, Scroll Camera & Initial State
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Attach 3D perspective tilt listeners to project and hero cards
  document.querySelectorAll('.tilt-card, .tilt-element').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6.5;
      const rotY = ((x - cx) / cx) * 6.5;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`;
      const glare = card.querySelector('.card-glare');
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(0, 240, 255, 0.16), transparent 60%)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // Scroll-linked 3D camera waypoints & active navbar link tracking
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const progress = scrollY / maxScroll;
    const w = window.innerWidth;
    const st = window.sceneState;

    if (st) {
      if (progress < 0.18) {
        st.targetOffsetX = w > 960 ? 250 : 0;
        st.targetZoom = 1.05;
      } else if (progress < 0.45) {
        st.targetOffsetX = w > 960 ? -240 : 0;
        st.targetZoom = 0.92;
      } else if (progress < 0.72) {
        st.targetOffsetX = w > 960 ? 220 : 0;
        st.targetZoom = 1.12;
      } else {
        st.targetOffsetX = 0;
        st.targetZoom = 0.88;
      }
    }

    const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];
    let currentSec = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 240) {
        currentSec = id;
      }
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentSec}`);
    });
  });

  // Initialize default role lens (supports optional ?role=sql or ?role=qa)
  const params = new URLSearchParams(window.location.search);
  const roleParam = (params.get('role') || '').toLowerCase();
  window.setRoleLens(window.ROLE_CONFIGS && window.ROLE_CONFIGS[roleParam] ? roleParam : 'fullstack');
});
