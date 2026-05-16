// components/Certificate.jsx

const Certificate = ({ mod, studentName, completedDate, certId, isFinal }) => {
  const meta = window.COURSE_META;
  const [name, setName] = React.useState(studentName || '');
  const [editing, setEditing] = React.useState(!studentName);

  const handlePrint = () => window.print();

  const displayDate = completedDate
    ? new Date(completedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const certTitle = isFinal
    ? 'Strategic Management'
    : (mod ? mod.certTitle || mod.title : 'Strategic Management');

  const certDesc = isFinal
    ? 'has successfully completed all modules and assessments of the MBA Certificate Course in'
    : 'has successfully completed the module assessment and demonstrated mastery of';

  return (
    <div className="cert-wrapper">
      <div className="topbar" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0 }}>
        <div className="topbar-title">{isFinal ? 'Course Certificate' : `Module Certificate — ${mod?.id}`}</div>
        <div className="topbar-actions">
          <button className="btn btn-secondary btn-sm" onClick={handlePrint}>⎙ Print / Save PDF</button>
        </div>
      </div>

      {editing && (
        <div style={{ background: 'var(--amber-light)', border: '1px solid var(--amber)', borderRadius: 'var(--radius)', padding: '18px 22px', margin: '24px 0 0', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.83rem', color: 'var(--text)', fontWeight: 500 }}>Enter your name for the certificate:</span>
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              flex: 1, minWidth: 200,
              padding: '8px 12px',
              border: '1.5px solid var(--amber)',
              borderRadius: 6,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              background: 'var(--bg-card)',
              color: 'var(--text)'
            }}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => { if (name.trim()) setEditing(false); }}
            disabled={!name.trim()}
          >
            Generate Certificate
          </button>
        </div>
      )}

      <div style={{ padding: '32px 0', display: editing && !name ? 'none' : 'block' }}>
        <div className="certificate" id="certificate-el">
          <div className="cert-corner tl"></div>
          <div className="cert-corner tr"></div>
          <div className="cert-corner bl"></div>
          <div className="cert-corner br"></div>
          <div className="cert-border"></div>

          <div className="cert-logo-text">Strategic Management MBA Certificate</div>

          {isFinal ? (
            <div className="cert-seal">🏛</div>
          ) : (
            <div className="cert-seal">✦</div>
          )}

          <div className="cert-headline">
            {isFinal ? 'Course Certificate of Completion' : 'Module Certificate of Achievement'}
          </div>

          <div className="cert-text" style={{ marginTop: 12 }}>This is to certify that</div>

          <div className="cert-student">{name || 'Your Name'}</div>

          <div className="cert-divider"></div>

          <div className="cert-text">{certDesc}</div>

          <div className="cert-module-title">{certTitle}</div>

          {isFinal && (
            <div className="cert-text" style={{ marginBottom: 4 }}>
              comprising eleven modules in strategic management, competitive analysis,<br/>
              digital strategy, leadership, sustainability, and emerging frontiers.
            </div>
          )}

          <div className="cert-footer">
            <div className="cert-sig-block">
              <div className="cert-sig-line"></div>
              <div className="cert-sig-name">
                <a href={meta.instructor.linkedin} target="_blank" rel="noopener noreferrer"
                   style={{ color: '#1c1a16', textDecoration: 'none' }}>
                  {meta.instructor.name}
                </a>
              </div>
              <div className="cert-sig-role">{meta.instructor.title}</div>
            </div>

            <div className="cert-meta">
              <div><strong>Date:</strong> {displayDate}</div>
              <div><strong>Certificate ID:</strong> {certId || 'SMC-' + Math.random().toString(36).slice(2,9).toUpperCase()}</div>
              {mod && <div><strong>Module:</strong> {mod.id} of 11</div>}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>
            Use your browser's Print function to save as PDF. Set paper to landscape for best results.
          </p>
          {editing && (
            <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>
              Edit Name
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #certificate-el, #certificate-el * { visibility: visible; }
          #certificate-el {
            position: fixed; top: 0; left: 0;
            width: 100vw; height: 100vh;
            box-shadow: none; border: none;
          }
        }
      `}</style>
    </div>
  );
};

window.Certificate = Certificate;
