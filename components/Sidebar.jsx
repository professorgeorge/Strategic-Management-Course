// components/Sidebar.jsx
// Left navigation sidebar

const Sidebar = ({ route, setRoute, progress, studentName }) => {
  const meta = window.COURSE_META;
  const modules = meta.modules;

  const getStatus = (modId) => {
    const p = progress[modId];
    if (!p) return 'not-started';
    if (p.completed) return 'completed';
    if (p.started) return 'in-progress';
    return 'not-started';
  };

  const navItems = [
    { label: 'Dashboard', route: 'dashboard', icon: '⊞' },
    { label: 'My Journal', route: 'journal', icon: '✦' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-title">Strategic Management</div>
        <div className="sidebar-logo-sub">MBA Certificate Course</div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {navItems.map(item => (
          <div
            key={item.route}
            className={`sidebar-item ${route === item.route ? 'active' : ''}`}
            onClick={() => setRoute(item.route)}
          >
            <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: 8 }}>Modules</div>
        {modules.map(mod => {
          const status = getStatus(mod.id);
          const isActive = route === `module/${mod.id}`;
          return (
            <div
              key={mod.id}
              className={`sidebar-item ${isActive ? 'active' : ''} ${status}`}
              onClick={() => setRoute(`module/${mod.id}`)}
            >
              <span className="sidebar-item-num">{String(mod.id).padStart(2, '0')}</span>
              <span style={{ flex: 1, lineHeight: 1.35 }}>{mod.title}</span>
              <span className="status-dot"></span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {studentName && (
          <div style={{ padding: '10px 8px 10px', marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(200,122,40,0.25)', border: '1px solid rgba(200,122,40,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'var(--amber)', flexShrink: 0 }}>
              {studentName.split(' ').map(n => n[0]).slice(0,2).join('')}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(237,233,227,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{studentName}</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(237,233,227,0.3)' }}>MBA Student</div>
            </div>
          </div>
        )}
        <a
          href={meta.instructor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-instructor"
        >
          <div className="instructor-avatar">BG</div>
          <div className="instructor-info">
            <div className="instructor-name">{meta.instructor.name}</div>
            <div className="instructor-role">View LinkedIn ↗</div>
          </div>
        </a>
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
