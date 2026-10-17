/* ==========================================================================
   Interactive 3D Fibonacci Skill Sphere (#skillSphereCanvas)
   ========================================================================== */
(function initSkillSphere() {
  const spCanvas = document.getElementById('skillSphereCanvas');
  if (!spCanvas) return;
  const spCtx = spCanvas.getContext('2d');

  const skills = window.SKILLS_3D || [];
  const sphereRadius = 152;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const skillNodes = skills.map((sk, i) => {
    const y = 1 - (i / Math.max(1, skills.length - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    return {
      ...sk,
      x: Math.cos(theta) * r * sphereRadius,
      y: y * sphereRadius,
      z: Math.sin(theta) * r * sphereRadius
    };
  });

  let spRotX = 0.2;
  let spRotY = 0.4;
  let spDragging = false;
  let spLastX = 0, spLastY = 0;

  spCanvas.addEventListener('mousedown', (e) => {
    spDragging = true;
    spLastX = e.clientX;
    spLastY = e.clientY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!spDragging) return;
    spRotY += (e.clientX - spLastX) * 0.01;
    spRotX = Math.max(-1.4, Math.min(1.4, spRotX + (e.clientY - spLastY) * 0.01));
    spLastX = e.clientX;
    spLastY = e.clientY;
  });
  window.addEventListener('mouseup', () => { spDragging = false; });

  function renderSkillSphere() {
    spCtx.clearRect(0, 0, spCanvas.width, spCanvas.height);
    if (!spDragging) {
      spRotY += 0.0065;
    }
    const cx = spCanvas.width / 2;
    const cy = spCanvas.height / 2;

    const projected = skillNodes.map(n => {
      const rot = window.rotate3D(n, spRotX, spRotY);
      const scale = 360 / (360 + rot.z);
      return {
        ...n,
        px: cx + rot.x * scale,
        py: cy + rot.y * scale,
        pz: rot.z,
        scale
      };
    }).sort((a, b) => b.pz - a.pz);

    spCtx.lineWidth = 0.8;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const d = Math.hypot(projected[i].px - projected[j].px, projected[i].py - projected[j].py);
        if (d < 82) {
          spCtx.strokeStyle = `rgba(99, 102, 241, ${(1 - d / 82) * 0.25})`;
          spCtx.beginPath();
          spCtx.moveTo(projected[i].px, projected[i].py);
          spCtx.lineTo(projected[j].px, projected[j].py);
          spCtx.stroke();
        }
      }
    }

    const activeRole = window.currentRole || 'fullstack';
    projected.forEach(node => {
      const isMatch = node.roles.includes(activeRole);
      const alpha = Math.max(0.22, Math.min(1, (180 - node.pz) / 310));
      spCtx.save();
      spCtx.globalAlpha = alpha;

      spCtx.fillStyle = isMatch ? node.color : '#475569';
      spCtx.beginPath();
      spCtx.arc(node.px, node.py, (isMatch ? 4.5 : 3) * node.scale, 0, Math.PI * 2);
      spCtx.fill();

      spCtx.font = `${isMatch ? '700' : '500'} ${Math.round(11.5 * node.scale)}px Inter, sans-serif`;
      spCtx.fillStyle = isMatch ? '#f8fafc' : '#94a3b8';
      spCtx.fillText(node.label, node.px + 8 * node.scale, node.py + 4 * node.scale);
      spCtx.restore();
    });

    requestAnimationFrame(renderSkillSphere);
  }
  requestAnimationFrame(renderSkillSphere);
})();
