/* ==========================================================================
   Full-Viewport 3D Spatial Engine (#bg3d)
   - Geodesic Icosahedron Cyber-Core & Counter-Rotating Inner Polyhedron
   - 3 Orbital Telemetry Rings with Traveling Data Packets
   - 280 3D Starfield Particles & Camera Orbit / Scroll Waypoints
   ========================================================================== */
window.rotate3D = function(pt, rx, ry, rz = 0) {
  let cosY = Math.cos(ry), sinY = Math.sin(ry);
  let x1 = pt.x * cosY - pt.z * sinY;
  let z1 = pt.z * cosY + pt.x * sinY;
  let y1 = pt.y;
  let cosX = Math.cos(rx), sinX = Math.sin(rx);
  let y2 = y1 * cosX - z1 * sinX;
  let z2 = z1 * cosX + y1 * sinX;
  let x2 = x1;
  if (rz !== 0) {
    let cosZ = Math.cos(rz), sinZ = Math.sin(rz);
    let x3 = x2 * cosZ - y2 * sinZ;
    let y3 = y2 * cosZ + x2 * sinZ;
    return { x: x3, y: y3, z: z2 };
  }
  return { x: x2, y: y2, z: z2 };
};

(function initBg3D() {
  const bgCanvas = document.getElementById('bg3d');
  if (!bgCanvas) return;
  const ctx = bgCanvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;

  function resizeBgCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    bgCanvas.width = width * dpr;
    bgCanvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resizeBgCanvas);
  resizeBgCanvas();

  window.sceneState = {
    autoOrbit: true,
    wireframeOnly: false,
    warpBoost: 0,
    camRotX: 0.28,
    camRotY: 0.52,
    targetRotX: 0.28,
    targetRotY: 0.52,
    camOffsetX: 240,
    targetOffsetX: 240,
    camZoom: 1.0,
    targetZoom: 1.0
  };

  const phi = (1 + Math.sqrt(5)) / 2;
  const rawIcoVerts = [
    [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
  ].map(([x, y, z]) => {
    const len = Math.hypot(x, y, z);
    return { x: (x / len) * 145, y: (y / len) * 145, z: (z / len) * 145 };
  });

  const icoFaces = [
    [0,11,5], [0,5,1], [0,1,7], [0,7,10], [0,10,11],
    [1,5,9], [5,11,4], [11,10,2], [10,7,6], [7,1,8],
    [3,9,4], [3,4,2], [3,2,6], [3,6,8], [3,8,9],
    [4,9,5], [2,4,11], [6,2,10], [8,6,7], [9,8,1]
  ];

  const icoEdges = [];
  const edgeSet = new Set();
  icoFaces.forEach(([a, b, c]) => {
    [[a,b],[b,c],[c,a]].forEach(([u,v]) => {
      const key = u < v ? `${u}-${v}` : `${v}-${u}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        icoEdges.push([u, v]);
      }
    });
  });

  const orbitalRings = [
    { radius: 225, tiltX: 0.95, tiltZ: 0.25, color: 'rgba(0, 240, 255, 0.36)', speed: 0.008, particles: 4 },
    { radius: 285, tiltX: -0.55, tiltZ: 0.75, color: 'rgba(99, 102, 241, 0.34)', speed: -0.006, particles: 3 },
    { radius: 345, tiltX: 0.25, tiltZ: -0.85, color: 'rgba(16, 185, 129, 0.26)', speed: 0.004, particles: 3 }
  ];

  const stars = Array.from({ length: 280 }, () => ({
    x: (Math.random() - 0.5) * 1800,
    y: (Math.random() - 0.5) * 1400,
    z: (Math.random() - 0.5) * 1400,
    size: Math.random() * 1.9 + 0.6,
    hue: Math.random() > 0.5 ? 186 : 240
  }));

  let isDraggingBg = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  window.addEventListener('mousedown', (e) => {
    if (e.target === bgCanvas || document.body.classList.contains('freelook-mode')) {
      isDraggingBg = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }
  });
  window.addEventListener('mousemove', (e) => {
    const st = window.sceneState;
    if (isDraggingBg) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      st.targetRotY += dx * 0.0065;
      st.targetRotX = Math.max(-1.3, Math.min(1.3, st.targetRotX + dy * 0.0065));
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    } else {
      const nx = (e.clientX / width - 0.5) * 0.12;
      const ny = (e.clientY / height - 0.5) * 0.12;
      st.targetRotY += nx * 0.02;
      st.targetRotX += ny * 0.01;
    }
  });
  window.addEventListener('mouseup', () => { isDraggingBg = false; });

  function project3D(pt, centerX, centerY, fov = 680) {
    const distance = 760;
    const scale = (fov / Math.max(80, distance + pt.z)) * window.sceneState.camZoom;
    return {
      x: centerX + pt.x * scale,
      y: centerY + pt.y * scale,
      z: pt.z,
      scale
    };
  }

  let tick = 0;
  function renderBg3D() {
    tick += 1;
    ctx.clearRect(0, 0, width, height);
    const st = window.sceneState;

    if (st.autoOrbit && !isDraggingBg) {
      st.targetRotY += 0.0045 + st.warpBoost * 0.03;
    }
    st.warpBoost *= 0.94;

    st.camRotX += (st.targetRotX - st.camRotX) * 0.08;
    st.camRotY += (st.targetRotY - st.camRotY) * 0.08;
    st.camOffsetX += (st.targetOffsetX - st.camOffsetX) * 0.06;
    st.camZoom += (st.targetZoom - st.camZoom) * 0.06;

    const centerX = width / 2 + st.camOffsetX;
    const centerY = height / 2;

    stars.forEach(s => {
      s.z -= 1.2 + st.warpBoost * 24;
      if (s.z < -680) s.z = 720;
      const r = window.rotate3D(s, st.camRotX * 0.25, st.camRotY * 0.25);
      const p = project3D(r, width / 2, height / 2, 620);
      const alpha = Math.max(0.08, Math.min(0.85, (720 - r.z) / 1200));
      ctx.fillStyle = `hsla(${s.hue}, 95%, 72%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, s.size * p.scale, 0, Math.PI * 2);
      ctx.fill();
    });

    const coreGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 280 * st.camZoom);
    coreGrad.addColorStop(0, 'rgba(0, 240, 255, 0.16)');
    coreGrad.addColorStop(0.45, 'rgba(99, 102, 241, 0.08)');
    coreGrad.addColorStop(1, 'rgba(5, 8, 20, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 280 * st.camZoom, 0, Math.PI * 2);
    ctx.fill();

    orbitalRings.forEach((ring, idx) => {
      const segs = 64;
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        const raw = { x: Math.cos(theta) * ring.radius, y: 0, z: Math.sin(theta) * ring.radius };
        const tilted = window.rotate3D(raw, ring.tiltX, tick * ring.speed, ring.tiltZ);
        const world = window.rotate3D(tilted, st.camRotX, st.camRotY);
        const proj = project3D(world, centerX, centerY);
        if (i === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      for (let pIdx = 0; pIdx < ring.particles; pIdx++) {
        const angle = tick * ring.speed * 3.2 + (pIdx * Math.PI * 2) / ring.particles;
        const raw = { x: Math.cos(angle) * ring.radius, y: 0, z: Math.sin(angle) * ring.radius };
        const tilted = window.rotate3D(raw, ring.tiltX, tick * ring.speed, ring.tiltZ);
        const world = window.rotate3D(tilted, st.camRotX, st.camRotY);
        const proj = project3D(world, centerX, centerY);
        ctx.fillStyle = idx === 0 ? '#00f0ff' : idx === 1 ? '#a855f7' : '#10b981';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 3.6 * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    const pulse = 1 + Math.sin(tick * 0.035) * 0.045 + st.warpBoost * 0.18;
    const transformedVerts = rawIcoVerts.map(v => {
      const scaled = { x: v.x * pulse, y: v.y * pulse, z: v.z * pulse };
      const rot = window.rotate3D(scaled, st.camRotX, st.camRotY, tick * 0.003);
      return project3D(rot, centerX, centerY);
    });

    if (!st.wireframeOnly) {
      const sortedFaces = icoFaces.map(face => {
        const [i1, i2, i3] = face;
        const v1 = transformedVerts[i1], v2 = transformedVerts[i2], v3 = transformedVerts[i3];
        const avgZ = (v1.z + v2.z + v3.z) / 3;
        return { face, v1, v2, v3, avgZ };
      }).sort((a, b) => b.avgZ - a.avgZ);

      sortedFaces.forEach(({ v1, v2, v3, avgZ }) => {
        const shade = Math.max(0.04, Math.min(0.24, (200 - avgZ) / 900));
        ctx.fillStyle = `rgba(30, 64, 175, ${shade})`;
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.closePath();
        ctx.fill();
      });
    }

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.65)';
    ctx.lineWidth = 1.4;
    icoEdges.forEach(([u, v]) => {
      const p1 = transformedVerts[u];
      const p2 = transformedVerts[v];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    transformedVerts.forEach(p => {
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.2 * p.scale, 0, Math.PI * 2);
      ctx.fill();
    });

    const innerVerts = rawIcoVerts.map(v => {
      const s = { x: v.x * 0.52, y: v.y * 0.52, z: v.z * 0.52 };
      const rot = window.rotate3D(s, -st.camRotX * 1.3, -st.camRotY * 1.4, -tick * 0.008);
      return project3D(rot, centerX, centerY);
    });
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.55)';
    ctx.lineWidth = 1.1;
    icoEdges.forEach(([u, v]) => {
      ctx.beginPath();
      ctx.moveTo(innerVerts[u].x, innerVerts[u].y);
      ctx.lineTo(innerVerts[v].x, innerVerts[v].y);
      ctx.stroke();
    });

    requestAnimationFrame(renderBg3D);
  }
  requestAnimationFrame(renderBg3D);
})();
