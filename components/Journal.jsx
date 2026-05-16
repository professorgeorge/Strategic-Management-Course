// components/Journal.jsx

const Journal = ({ progress }) => {
  const meta = window.COURSE_META;
  const modules = meta.modules;

  const [activeTab, setActiveTab] = React.useState(0);
  const [notes, setNotes] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('smc_journal') || '{}'); }
    catch { return {}; }
  });

  const reflectionPrompts = [
    "What is the most important strategic insight I've gained from this module?",
    "How does this module's content apply to an organization I know well?",
    "What conventional management wisdom does this module challenge?",
    "What would I do differently as a strategic leader after studying this?",
    "What questions does this material raise that I want to explore further?"
  ];

  const saveNote = (key, value) => {
    const updated = { ...notes, [key]: { content: value, lastEdited: new Date().toISOString() } };
    setNotes(updated);
    localStorage.setItem('smc_journal', JSON.stringify(updated));
  };

  const tabs = [
    ...modules.map((m, i) => ({ label: `M${m.id}`, fullLabel: m.title, key: `module-${m.id}` })),
    { label: 'Reflect', fullLabel: 'Strategic Reflections', key: 'reflections' }
  ];

  const tab = tabs[activeTab];

  return (
    <div>
      <div className="topbar">
        <div className="topbar-title">My Journal</div>
        <div className="topbar-actions">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Auto-saved to browser
          </span>
        </div>
      </div>

      <div className="journal-view">
        <h1 className="journal-title">Strategic Learning Journal</h1>
        <p className="journal-subtitle">
          Capture insights, reflections, and applications as you progress through the course.
          Your notes are saved locally in your browser.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 4, minWidth: 'max-content', background: 'var(--bg-alt)', borderRadius: 8, padding: 4 }}>
            {tabs.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '7px 12px',
                  border: 'none',
                  borderRadius: 6,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: activeTab === i ? 'var(--bg-card)' : 'transparent',
                  color: activeTab === i ? 'var(--text)' : 'var(--text-muted)',
                  boxShadow: activeTab === i ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab.key !== 'reflections' ? (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 500, marginBottom: 4 }}>
                {tabs[activeTab].fullLabel}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Module {activeTab + 1} Notes
              </div>
            </div>

            <div className="journal-entry">
              <div className="journal-entry-title">My Notes & Insights</div>
              <textarea
                className="journal-textarea"
                placeholder="What did you learn? What surprised you? What will you apply?"
                value={notes[tab.key]?.content || ''}
                onChange={e => saveNote(tab.key, e.target.value)}
              />
              {notes[tab.key]?.lastEdited && (
                <div className="journal-entry-meta">
                  Last edited: {new Date(notes[tab.key].lastEdited).toLocaleString()}
                </div>
              )}
            </div>

            <div className="journal-entry" style={{ marginTop: 16 }}>
              <div className="journal-entry-title">Application Exercise</div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 }}>
                Apply the key concepts from this module to a real organization you know:
                a company, nonprofit, startup, or government agency.
              </p>
              <textarea
                className="journal-textarea"
                placeholder="Describe how you would apply this module's frameworks to a specific organization..."
                value={notes[tab.key + '-apply']?.content || ''}
                onChange={e => saveNote(tab.key + '-apply', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 500, marginBottom: 20 }}>
              Strategic Reflections
            </div>
            {reflectionPrompts.map((prompt, i) => (
              <div key={i} className="journal-entry" style={{ marginBottom: 16 }}>
                <div className="journal-entry-title" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {prompt}
                </div>
                <textarea
                  className="journal-textarea"
                  placeholder="Your reflection..."
                  style={{ minHeight: 100 }}
                  value={notes[`reflect-${i}`]?.content || ''}
                  onChange={e => saveNote(`reflect-${i}`, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

window.Journal = Journal;
