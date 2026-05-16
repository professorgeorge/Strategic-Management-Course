// components/Dashboard.jsx

const Dashboard = ({ setRoute, progress }) => {
  const meta = window.COURSE_META;
  const modules = meta.modules;

  const completedCount = modules.filter(m => progress[m.id]?.completed).length;
  const inProgressCount = modules.filter(m => progress[m.id]?.started && !progress[m.id]?.completed).length;
  const overallPct = Math.round((completedCount / modules.length) * 100);

  const getModuleProgress = (mod) => {
    const p = progress[mod.id];
    if (!p) return 0;
    if (p.completed) return 100;
    const total = mod.lessonCount + 1; // lessons + quiz
    const done = Object.values(p.lessons || {}).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  const getStatus = (mod) => {
    const p = progress[mod.id];
    if (!p || !p.started) return 'not-started';
    if (p.completed) return 'completed';
    return 'in-progress';
  };

  const getStatusLabel = (mod) => {
    const s = getStatus(mod);
    if (s === 'completed') return 'Completed';
    if (s === 'in-progress') return 'In Progress';
    return 'Not Started';
  };

  const getStatusBadgeClass = (mod) => {
    const s = getStatus(mod);
    if (s === 'completed') return 'badge-completed';
    if (s === 'in-progress') return 'badge-in-progress';
    return 'badge-not-started';
  };

  // Find resume point
  const lastModule = Object.entries(progress)
    .filter(([, p]) => p.started && !p.completed)
    .map(([id]) => modules.find(m => m.id === parseInt(id)))
    .filter(Boolean)[0];

  const quizzesPassedCount = modules.filter(m => (progress[m.id]?.quizScore || 0) >= 70).length;

  return (
    <div>
      <div className="topbar">
        <div className="topbar-title">Dashboard</div>
        <div className="topbar-actions">
          {lastModule && (
            <button className="btn btn-primary btn-sm" onClick={() => setRoute(`module/${lastModule.id}`)}>
              Resume Module {lastModule.id} →
            </button>
          )}
        </div>
      </div>

      <div className="dashboard">
        <div className="dashboard-hero">
          <div className="dashboard-welcome">Welcome Back</div>
          <h1 className="dashboard-title">Strategic Management<br />MBA Certificate Course</h1>
          <p className="dashboard-subtitle">
            A rigorous, future-facing curriculum spanning foundations to emerging frontiers —
            designed for the strategist navigating disruption, complexity, and transformation.
          </p>
          <a
            href={meta.instructor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="instructor-link"
          >
            <span style={{ fontSize: '1.1rem' }}>👤</span>
            Taught by {meta.instructor.name}
          </a>
        </div>

        <div className="progress-overview">
          <div className="stat-card">
            <div className="stat-value">{completedCount}</div>
            <div className="stat-label">Modules Completed</div>
            <div className="overall-progress-bar" style={{ marginTop: 12 }}>
              <div className="overall-progress-fill" style={{ width: `${overallPct}%` }}></div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{inProgressCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{modules.length - completedCount - inProgressCount}</div>
            <div className="stat-label">Not Started</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{quizzesPassedCount}</div>
            <div className="stat-label">Assessments Passed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{overallPct}%</div>
            <div className="stat-label">Course Progress</div>
          </div>
        </div>

        <div className="section-heading">
          <span>Course Modules</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
            {modules.length} modules · Self-paced
          </span>
        </div>

        <div className="modules-grid">
          {modules.map(mod => {
            const pct = getModuleProgress(mod);
            return (
              <div
                key={mod.id}
                className="module-card"
                style={{ '--module-color': mod.color }}
                onClick={() => setRoute(`module/${mod.id}`)}
              >
                <div className="module-card-header">
                  <div>
                    <div className="module-card-number">Module {String(mod.id).padStart(2,'0')}</div>
                  </div>
                  <div className="module-card-tag" style={{
                    background: mod.color + '22',
                    color: mod.color
                  }}>{mod.tag}</div>
                </div>
                <div className="module-card-title">{mod.title}</div>
                <div className="module-card-subtitle">{mod.subtitle}</div>
                <div className="module-progress-bar">
                  <div className="module-progress-fill" style={{ width: `${pct}%`, background: mod.color }}></div>
                </div>
                <div className="module-card-footer">
                  <div className="module-card-meta">{mod.duration} · {mod.lessonCount} lessons</div>
                  <span className={`module-status-badge ${getStatusBadgeClass(mod)}`}>
                    {getStatusLabel(mod)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {completedCount === modules.length && (
          <div style={{
            background: 'linear-gradient(135deg, var(--amber-light), var(--bg-card))',
            border: '1.5px solid var(--amber)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            textAlign: 'center',
            marginBottom: 32
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>🏆</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 400, marginBottom: 8 }}>
              Course Complete!
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              Congratulations. You have completed all modules and assessments.
            </p>
            <button className="btn btn-primary" onClick={() => setRoute('certificate/final')}>
              View Final Certificate →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
