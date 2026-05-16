// App.jsx — Main router, state manager, onboarding

const Onboarding = ({ onComplete }) => {
  const meta = window.COURSE_META;
  const [name, setName] = React.useState('');
  const [step, setStep] = React.useState(1); // 1 = welcome, 2 = name
  const [animIn, setAnimIn] = React.useState(true);

  const handleStart = () => {
    if (!name.trim()) return;
    onComplete(name.trim());
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bg-sidebar)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '24px',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: 520, width: '100%',
        animation: 'fadeSlideUp 0.6s ease forwards'
      }}>
        {/* Logo bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: '#1c1a16' }}>SM</div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(237,233,227,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>MBA Certificate Course</div>
          </div>
        </div>

        {step === 1 && (
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 16 }}>Welcome</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 300, color: '#ede9e3', lineHeight: 1.15, marginBottom: 20 }}>
              Strategic<br />Management
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'rgba(237,233,227,0.55)', lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              A rigorous, self-paced MBA course designed for the strategist navigating disruption, complexity, and global transformation. Eleven modules. Real assessments. Certificates upon completion.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '18px 20px', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1c1a16', fontSize: '1rem', flexShrink: 0 }}>BG</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ede9e3' }}>
                  <a href={meta.instructor.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'none' }}>
                    {meta.instructor.name} ↗
                  </a>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(237,233,227,0.4)', marginTop: 2 }}>{meta.instructor.title}</div>
                <div style={{ fontSize: '0.73rem', color: 'rgba(237,233,227,0.35)', marginTop: 4, lineHeight: 1.5 }}>
                  Globally recognized scholar in strategy, complexity &amp; sustainability.
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 40 }}>
              {[
                { n: '11', l: 'Modules' },
                { n: '88', l: 'MCQ Questions' },
                { n: '100%', l: 'Self-Paced' }
              ].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '14px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 300, color: 'var(--amber)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(237,233,227,0.35)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '0.9rem', padding: '14px', borderRadius: 8 }}
              onClick={() => setStep(2)}
            >
              Begin Course →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'rgba(237,233,227,0.4)', fontSize: '0.8rem', cursor: 'pointer', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', padding: 0 }}>
              ← Back
            </button>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 14 }}>Your Profile</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, color: '#ede9e3', lineHeight: 1.2, marginBottom: 10 }}>
              What should your certificates say?
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(237,233,227,0.45)', marginBottom: 32, lineHeight: 1.6 }}>
              Your name will appear on all module certificates and your final course certificate. You can update it later from settings.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(237,233,227,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Full Name *
              </label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Alexandra Chen"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && name.trim()) handleStart(); }}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid',
                  borderColor: name.trim() ? 'var(--amber)' : 'rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: '#ede9e3',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontWeight: 400
                }}
              />
            </div>

            {/* Name preview */}
            {name.trim() && (
              <div style={{ background: 'rgba(200,122,40,0.1)', border: '1px solid rgba(200,122,40,0.25)', borderRadius: 8, padding: '16px 18px', marginBottom: 28 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(200,122,40,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Certificate Preview</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--amber)' }}>{name.trim()}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(237,233,227,0.35)', marginTop: 4 }}>Strategic Management — MBA Certificate</div>
              </div>
            )}

            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '0.9rem', padding: '14px', borderRadius: 8 }}
              onClick={handleStart}
              disabled={!name.trim()}
            >
              Enter Course →
            </button>

            <p style={{ fontSize: '0.72rem', color: 'rgba(237,233,227,0.25)', marginTop: 16, textAlign: 'center', lineHeight: 1.5 }}>
              Your progress and notes are stored locally in your browser. No account needed.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ── Main App ───────────────────────────────────────────────────────────────
const App = () => {
  const meta = window.COURSE_META;

  // ── Student name & onboarding ──────────────────────────────────────────
  const [studentName, setStudentName] = React.useState(() =>
    localStorage.getItem('smc_student_name') || ''
  );
  const [onboarded, setOnboarded] = React.useState(() =>
    !!localStorage.getItem('smc_student_name')
  );

  const completeOnboarding = (name) => {
    localStorage.setItem('smc_student_name', name);
    setStudentName(name);
    setOnboarded(true);
  };

  // ── Theme ──────────────────────────────────────────────────────────────
  const [theme, setTheme] = React.useState(() =>
    localStorage.getItem('smc_theme') || 'light'
  );
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('smc_theme', theme);
  }, [theme]);

  // ── Route ──────────────────────────────────────────────────────────────
  const [route, setRouteRaw] = React.useState(() =>
    localStorage.getItem('smc_route') || 'dashboard'
  );
  const setRoute = (r) => {
    setRouteRaw(r);
    localStorage.setItem('smc_route', r);
    setTimeout(() => {
      const el = document.querySelector('.lesson-content-area, .main-content');
      if (el) el.scrollTop = 0;
    }, 50);
  };

  // ── Progress ───────────────────────────────────────────────────────────
  const [progress, setProgress] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('smc_progress') || '{}'); }
    catch { return {}; }
  });
  const updateProgress = (moduleId, data) => {
    setProgress(prev => {
      const next = { ...prev, [moduleId]: { ...data, studentName } };
      localStorage.setItem('smc_progress', JSON.stringify(next));
      return next;
    });
  };

  // ── PWA install prompt ─────────────────────────────────────────────────
  const [installPrompt, setInstallPrompt] = React.useState(null);
  const [showInstall, setShowInstall] = React.useState(false);
  React.useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); setShowInstall(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then(() => { setInstallPrompt(null); setShowInstall(false); });
  };

  // ── Parse route ────────────────────────────────────────────────────────
  const parseRoute = () => {
    if (route === 'dashboard') return { type: 'dashboard' };
    if (route === 'journal')   return { type: 'journal' };
    if (route === 'certificate/final') return { type: 'cert-final' };
    if (route.startsWith('module/')) {
      const id = parseInt(route.split('/')[1]);
      const mod = meta.modules.find(m => m.id === id);
      return mod ? { type: 'module', mod } : { type: 'dashboard' };
    }
    return { type: 'dashboard' };
  };
  const parsed = parseRoute();

  // ── Show onboarding if no name ─────────────────────────────────────────
  if (!onboarded) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  // ── Render main ────────────────────────────────────────────────────────
  const renderMain = () => {
    switch (parsed.type) {
      case 'dashboard':
        return <Dashboard setRoute={setRoute} progress={progress} studentName={studentName} />;
      case 'journal':
        return <Journal progress={progress} />;
      case 'module':
        return (
          <ModulePage
            mod={parsed.mod}
            progress={progress}
            updateProgress={updateProgress}
            setRoute={setRoute}
            studentName={studentName}
          />
        );
      case 'cert-final':
        return (
          <div>
            <div className="topbar">
              <div className="topbar-title">Course Certificate</div>
              <div className="topbar-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => setRoute('dashboard')}>← Dashboard</button>
              </div>
            </div>
            <Certificate
              isFinal={true}
              studentName={studentName}
              completedDate={new Date().toISOString()}
              certId={'SMC-FINAL-' + Date.now().toString(36).toUpperCase()}
            />
          </div>
        );
      default:
        return <Dashboard setRoute={setRoute} progress={progress} studentName={studentName} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar route={route} setRoute={setRoute} progress={progress} studentName={studentName} />

      <div className={parsed.type === 'module' ? '' : 'main-content'}>
        {renderMain()}

        {/* Theme toggle */}
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {showInstall && (
            <button
              onClick={handleInstall}
              style={{
                background: 'var(--amber)', color: '#1c1a16',
                border: 'none', borderRadius: 8, padding: '10px 14px',
                fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-sans)',
                display: 'flex', alignItems: 'center', gap: 6,
                animation: 'fadeSlideUp 0.4s ease'
              }}
              title="Install as app"
            >
              ⊕ Install App
            </button>
          )}
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            title="Toggle dark mode"
            style={{ width: 40, height: 40, boxShadow: 'var(--shadow)' }}
          >
            {theme === 'light' ? '☾' : '○'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Mount
const rootEl = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(rootEl);
reactRoot.render(<App />);
