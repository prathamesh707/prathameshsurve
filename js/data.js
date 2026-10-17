/* ==========================================================================
   Portfolio Data: Role Focus Configurations, 3D Skills & System Blueprints
   ========================================================================== */
window.ROLE_CONFIGS = {
  fullstack: {
    label: "FULL-STACK MERN & PYTHON",
    eyebrow: "// FULL-STACK MERN • REACT.JS (VITE) • NODE.JS • PYTHON/DJANGO",
    highlight: "full-stack web apps & real-time systems",
    lead: "Hi, I'm <strong>Prathamesh Anant Surve</strong> — a Mumbai-based Full-Stack Software Engineer experienced in building production web platforms with <strong>React.js (Vite), Node.js, Express.js, Python (Django), MongoDB, MySQL, and PHP</strong>. Finalist & winner across 4 national/inter-collegiate 24-hour hackathons."
  },
  sql: {
    label: "SQL, BACKEND & DATA ENGINEERING",
    eyebrow: "// SQL • POSTGRESQL • MYSQL • MONGODB AGGREGATION • PYTHON ETL",
    highlight: "database schemas, SQL queries & ETL pipelines",
    lead: "Hi, I'm <strong>Prathamesh Anant Surve</strong> — a detail-oriented <strong>SQL Developer and Backend Engineer</strong> skilled in <strong>PostgreSQL, MySQL, MongoDB, and Python (Django)</strong>. Experienced in 6-collection schema design, indexing, query optimization, and end-to-end ETL data pipelines."
  },
  qa: {
    label: "SOFTWARE ENGINEER & API / QA TESTING",
    eyebrow: "// FULL-STACK MERN • POSTMAN API TESTING • STLC & REGRESSION QA",
    highlight: "resilient web software & verified APIs",
    lead: "Hi, I'm <strong>Prathamesh Anant Surve</strong> — a detail-oriented Software Engineer combining <strong>full-stack MERN & Python development</strong> with rigorous <strong>manual testing, Postman API validation, test case design, and regression testing</strong> across the SDLC/STLC."
  }
};

window.SKILLS_3D = [
  { label: 'React.js (Vite)', roles: ['fullstack', 'qa'], color: '#00f0ff' },
  { label: 'Node.js', roles: ['fullstack', 'sql', 'qa'], color: '#10b981' },
  { label: 'Express.js', roles: ['fullstack', 'sql', 'qa'], color: '#10b981' },
  { label: 'MongoDB', roles: ['fullstack', 'sql', 'qa'], color: '#34d399' },
  { label: 'SQL', roles: ['sql', 'fullstack', 'qa'], color: '#fbbf24' },
  { label: 'PostgreSQL', roles: ['sql', 'fullstack'], color: '#fbbf24' },
  { label: 'MySQL', roles: ['sql', 'fullstack'], color: '#fbbf24' },
  { label: 'Python', roles: ['sql', 'fullstack', 'qa'], color: '#38bdf8' },
  { label: 'Django REST', roles: ['sql', 'fullstack'], color: '#38bdf8' },
  { label: '6-Coll Schema', roles: ['sql'], color: '#f59e0b' },
  { label: 'ETL Pipelines', roles: ['sql'], color: '#f59e0b' },
  { label: 'Query Indexing', roles: ['sql'], color: '#f59e0b' },
  { label: 'JWT & OTP Auth', roles: ['fullstack', 'qa'], color: '#a855f7' },
  { label: 'PDFKit QR', roles: ['fullstack'], color: '#00f0ff' },
  { label: 'Fast2SMS API', roles: ['fullstack'], color: '#00f0ff' },
  { label: 'Postman API QA', roles: ['qa', 'fullstack'], color: '#f43f5e' },
  { label: 'Manual & Reg QA', roles: ['qa'], color: '#f43f5e' },
  { label: 'Test Case Design', roles: ['qa'], color: '#f43f5e' },
  { label: 'JavaScript ES6+', roles: ['fullstack', 'qa'], color: '#00f0ff' },
  { label: 'PHP', roles: ['fullstack', 'sql'], color: '#818cf8' },
  { label: 'React Native', roles: ['fullstack'], color: '#00f0ff' },
  { label: 'Git & GitHub', roles: ['fullstack', 'sql', 'qa'], color: '#cbd5e1' },
  { label: 'SDLC / STLC', roles: ['qa', 'fullstack'], color: '#f43f5e' },
  { label: 'AI / ML & Web3', roles: ['fullstack'], color: '#c084fc' }
];

window.ARCH_BLUEPRINTS = {
  entryease: {
    tag: "// 6-COLLECTION MONGODB SCHEMA & ETL PIPELINE",
    title: "EntryEase — Gate Pass & Faculty Appointment System",
    html: `
      <p style="color:#cbd5e1; font-size:0.92rem; margin-bottom:14px;">
        Full-stack digital gate pass and appointment management platform replacing manual paper registers with role-based portals for <strong>Visitors, Security Guards, and Admins</strong>.
      </p>
      <div class="arch-flow">
        <div class="arch-node">
          <div class="arch-node-title">1. Client Capture</div>
          <div class="arch-node-sub">React.js (Vite) UI + Live Webcam Capture via <code>MediaDevices API</code> + Mobile OTP Validation</div>
        </div>
        <div class="arch-node">
          <div class="arch-node-title">2. Auth & API Gateway</div>
          <div class="arch-node-sub">Node.js & Express.js REST API + Role-Based JWT Middleware (Visitor / Guard / Admin)</div>
        </div>
        <div class="arch-node">
          <div class="arch-node-title">3. 6-Collection DB</div>
          <div class="arch-node-sub">MongoDB with Compound Indexes, TTL Auto-Expiry Jobs & Aggregation Pipelines</div>
        </div>
        <div class="arch-node">
          <div class="arch-node-title">4. Pass & Notification ETL</div>
          <div class="arch-node-sub">Automated A5 QR Pass Card via <code>PDFKit</code> → Dispatched via Email (Nodemailer) & Fast2SMS (SMS/WhatsApp)</div>
        </div>
      </div>
      <div style="background:rgba(5,8,20,0.85); border:1px solid var(--border-subtle); border-radius:12px; padding:16px; font-family:var(--font-mono); font-size:0.79rem; color:#e2e8f0;">
        <div style="color:var(--cyan); margin-bottom:6px;">// 6-Collection MongoDB Schema & Aggregation Highlights:</div>
        • <strong>Visitors / Users / Appointments / GatePasses / TimeSlots / AuditLogs</strong><br/>
        • Compound indexes on slot timestamps + visitor phone for O(1) guard QR scan lookups<br/>
        • Background TTL expiry job automatically transitions expired passes and frees faculty time slots<br/>
        • Aggregation pipeline powers real-time Admin Dashboard metrics (peak visitor hours, approval rates, active passes)
      </div>
    `
  },
  dinesmart: {
    tag: "// DJANGO REST + REACT.JS + MONGODB ORM",
    title: "DineSmart — Full-Stack Food Ordering System",
    html: `
      <p style="color:#cbd5e1; font-size:0.92rem; margin-bottom:14px;">
        End-to-end food ordering platform combining a responsive React.js storefront with a Python/Django REST backend and MongoDB persistence.
      </p>
      <div class="arch-flow">
        <div class="arch-node">
          <div class="arch-node-title">1. React.js Storefront</div>
          <div class="arch-node-sub">Dynamic category filtering, interactive cart state management, and checkout UI</div>
        </div>
        <div class="arch-node">
          <div class="arch-node-title">2. Django REST API</div>
          <div class="arch-node-sub">Python/Django views, serializers, order validation, and session authentication</div>
        </div>
        <div class="arch-node">
          <div class="arch-node-title">3. MongoDB & ORM</div>
          <div class="arch-node-sub">Products, Orders & Users schemas + ORM aggregation for revenue reporting</div>
        </div>
      </div>
    `
  },
  foodwaste: {
    tag: "// 2x HACKATHON WINNING SOCIAL IMPACT PLATFORM",
    title: "Food Waste Management & NGO Redistribution System",
    html: `
      <p style="color:#cbd5e1; font-size:0.92rem; margin-bottom:14px;">
        Built to bridge surplus food from events/restaurants with verified NGOs in real time. Recognized at <strong>Technothon 2023 (Finalist & Judges' Special Mention)</strong> and <strong>Codebits 1.0 2024 (Rank 6th)</strong>.
      </p>
      <div class="arch-flow">
        <div class="arch-node">
          <div class="arch-node-title">1. Donor / Event Portal</div>
          <div class="arch-node-sub">Log surplus food quantities, shelf-life window, and pickup coordinates</div>
        </div>
        <div class="arch-node">
          <div class="arch-node-title">2. Matching Backend</div>
          <div class="arch-node-sub">Node.js/Express REST API matching nearby NGOs and tracking claim status</div>
        </div>
        <div class="arch-node">
          <div class="arch-node-title">3. NGO Dispatch UI</div>
          <div class="arch-node-sub">React.js dashboard for instant claim confirmation and volunteer routing</div>
        </div>
      </div>
    `
  }
};

window.currentRole = 'fullstack';
