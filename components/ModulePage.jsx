// components/ModulePage.jsx

const ModulePage = ({ mod, progress, updateProgress, setRoute, studentName }) => {
  const [view, setView] = React.useState('overview'); // 'overview' | lesson id | 'quiz' | 'certificate' | 'capstone'
  const p = progress[mod.id] || {};
  const lessons = mod.lessons;

  const isLessonDone = (lessonId) => !!(p.lessons && p.lessons[lessonId]);
  const allLessonsDone = lessons.every(l => isLessonDone(l.id));
  const quizPassed = (p.quizScore || 0) >= 70;
  const isCapstone = mod.id === 11;

  // Mark lesson complete
  const completeLesson = (lessonId) => {
    const updated = {
      ...p,
      started: true,
      lessons: { ...(p.lessons || {}), [lessonId]: true }
    };
    updateProgress(mod.id, updated);
  };

  // Handle quiz pass/fail
  const handleQuizPass = (score) => {
    const updated = { ...p, quizScore: score, completed: true, completedDate: new Date().toISOString() };
    updateProgress(mod.id, updated);
    setView('certificate');
  };

  const handleQuizFail = (score) => {
    updateProgress(mod.id, { ...p, quizScore: score });
  };

  // Capstone submit
  const handleCapstoneSubmit = () => {
    const updated = { ...p, completed: true, completedDate: new Date().toISOString() };
    updateProgress(mod.id, updated);
    setView('certificate');
  };

  const getLessonIdx = (id) => lessons.findIndex(l => l.id === id);
  const currentLessonObj = lessons.find(l => l.id === view);

  return (
    <div className="module-page">
      {/* Lesson sidebar */}
      <div className="lesson-sidebar">
        <div className="lesson-sidebar-header">
          <button className="lesson-sidebar-back" onClick={() => setRoute('dashboard')}>
            ← All Modules
          </button>
          <div className="lesson-sidebar-mod-title">{mod.title}</div>
          <div className="lesson-sidebar-mod-color" style={{ background: mod.color }}></div>
        </div>

        <div className="lesson-sidebar-nav">
          {/* Overview */}
          <div
            className={`lesson-nav-item ${view === 'overview' ? 'active' : ''}`}
            onClick={() => setView('overview')}
          >
            <div className={`lesson-nav-check ${view === 'overview' ? 'active-ring' : ''}`}>◎</div>
            <div className="lesson-nav-text">
              <div className="lesson-nav-title">Module Overview</div>
              <div className="lesson-nav-time">Objectives & Plan</div>
            </div>
          </div>

          {/* Lessons */}
          {lessons.map((lesson, idx) => {
            const done = isLessonDone(lesson.id);
            const isActive = view === lesson.id;
            return (
              <div
                key={lesson.id}
                className={`lesson-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setView(lesson.id)}
              >
                <div className={`lesson-nav-check ${done ? 'done' : isActive ? 'active-ring' : ''}`}>
                  {done ? '✓' : ''}
                </div>
                <div className="lesson-nav-text">
                  <div className="lesson-nav-title">{lesson.title}</div>
                  <div className="lesson-nav-time">{lesson.readTime}</div>
                  <span className={`lesson-nav-type type-${lesson.type}`}>
                    {lesson.type === 'disruptive' ? 'Disruptive' : lesson.type === 'future' ? 'Future' : lesson.type}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Quiz / Capstone */}
          {!isCapstone && (
            <div
              className={`lesson-nav-item ${view === 'quiz' ? 'active' : ''} ${quizPassed ? 'completed' : ''}`}
              onClick={() => setView('quiz')}
              style={{ cursor: 'pointer' }}
            >
              <div className={`lesson-nav-check ${quizPassed ? 'done' : view === 'quiz' ? 'active-ring' : ''}`}>
                {quizPassed ? '✓' : ''}
              </div>
              <div className="lesson-nav-text">
                <div className="lesson-nav-title">Module Assessment</div>
                <div className="lesson-nav-time">
                  {quizPassed ? `Passed · ${p.quizScore}%` : !allLessonsDone ? 'MCQ · Auto-graded' : 'MCQ · Auto-graded'}
                </div>
              </div>
            </div>
          )}

          {isCapstone && (
            <div
              className={`lesson-nav-item ${view === 'capstone' ? 'active' : ''} ${p.completed ? 'completed' : ''}`}
              onClick={() => setView('capstone')}
            >
              <div className={`lesson-nav-check ${p.completed ? 'done' : view === 'capstone' ? 'active-ring' : ''}`}>
                {p.completed ? '✓' : ''}
              </div>
              <div className="lesson-nav-text">
                <div className="lesson-nav-title">Submit Capstone</div>
                <div className="lesson-nav-time">{p.completed ? 'Submitted' : 'Final Project'}</div>
              </div>
            </div>
          )}

          {/* Certificate */}
          {p.completed && (
            <div
              className={`lesson-nav-item ${view === 'certificate' ? 'active' : ''}`}
              onClick={() => setView('certificate')}
            >
              <div className="lesson-nav-check done">★</div>
              <div className="lesson-nav-text">
                <div className="lesson-nav-title">Module Certificate</div>
                <div className="lesson-nav-time">View & Download</div>
              </div>
            </div>
          )}
        </div>

        <div className="lesson-sidebar-actions">
          {!isCapstone && allLessonsDone && !quizPassed && (
            <button className="btn btn-primary btn-sm btn-full" onClick={() => setView('quiz')}>
              Take Assessment →
            </button>
          )}
          {p.completed && (
            <button className="btn btn-secondary btn-sm btn-full" onClick={() => setView('certificate')}>
              View Certificate
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="lesson-content-area">
        {view === 'overview' && <ModuleOverview mod={mod} onStart={() => setView(lessons[0].id)} progress={p} quizPassed={quizPassed} setView={setView} allLessonsDone={allLessonsDone} />}

        {currentLessonObj && (
          <LessonView
            mod={mod}
            lesson={currentLessonObj}
            isCompleted={isLessonDone(currentLessonObj.id)}
            onComplete={() => { completeLesson(currentLessonObj.id); }}
            onNext={() => {
              const idx = getLessonIdx(currentLessonObj.id);
              if (idx < lessons.length - 1) setView(lessons[idx + 1].id);
              else if (!isCapstone) setView('quiz');
              else setView('capstone');
            }}
            onPrev={() => {
              const idx = getLessonIdx(currentLessonObj.id);
              if (idx > 0) setView(lessons[idx - 1].id);
              else setView('overview');
            }}
            hasNext={true}
            hasPrev={true}
          />
        )}

        {view === 'quiz' && !isCapstone && (
          <Quiz
            mod={mod}
            onPass={handleQuizPass}
            onFail={handleQuizFail}
            existingScore={p.quizScore}
          />
        )}

        {view === 'capstone' && isCapstone && (
          <CapstoneView mod={mod} progress={p} onSubmit={handleCapstoneSubmit} updateProgress={updateProgress} />
        )}

        {view === 'certificate' && p.completed && (
          <Certificate
            mod={mod}
            studentName={studentName || p.studentName}
            completedDate={p.completedDate}
            certId={p.certId || ('SMC-M' + mod.id + '-' + Date.now().toString(36).toUpperCase())}
          />
        )}
      </div>
    </div>
  );
};

/* Module Overview subcomponent */
const ModuleOverview = ({ mod, onStart, progress, quizPassed, setView, allLessonsDone }) => {
  const completedLessons = Object.values(progress.lessons || {}).filter(Boolean).length;
  const total = mod.lessons.length;

  return (
    <div className="module-overview">
      <div className="module-overview-header">
        <div className="module-num-badge">
          <span style={{ background: mod.color + '22', color: mod.color, padding: '2px 10px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {mod.tag}
          </span>
          Module {String(mod.id).padStart(2, '0')}
        </div>
        <h1 className="module-overview-title">{mod.title}</h1>
        <div className="module-overview-subtitle">{mod.subtitle}</div>
        <div className="module-color-bar" style={{ background: mod.color }}></div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {mod.duration} · {mod.lessonCount} lessons
          </span>
          {completedLessons > 0 && (
            <span style={{ fontSize: '0.8rem', color: 'var(--amber)', fontWeight: 600 }}>
              {completedLessons}/{total} lessons complete
            </span>
          )}
          {quizPassed && (
            <span style={{ fontSize: '0.8rem', color: 'oklch(45% 0.12 145)', fontWeight: 600 }}>
              ✓ Assessment Passed
            </span>
          )}
        </div>
      </div>

      <div className="objectives-section">
        <div className="objectives-title">Learning Objectives</div>
        <ul className="objectives-list">
          {mod.objectives.map((obj, i) => (
            <li key={i} className="objective-item">
              <span className="objective-dot"></span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lessons preview */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500, marginBottom: 16 }}>Lesson Plan</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mod.lessons.map((lesson, idx) => {
            const done = progress.lessons && progress.lessons[lesson.id];
            const typeLabel = { concept: 'Concept', framework: 'Framework', tool: 'Tool', disruptive: 'Disruptive', future: 'Future', brief: 'Brief' };
            return (
              <div key={lesson.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '10px 0', borderBottom: idx < mod.lessons.length - 1 ? '1px solid var(--border)' : 'none' }}
                onClick={() => setView(lesson.id)} style2={{ cursor: 'pointer' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid', borderColor: done ? '#22c55e' : 'var(--border-md)', background: done ? '#f0fdf4' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: done ? '#22c55e' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>
                  {done ? '✓' : idx + 1}
                </div>
                <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setView(lesson.id)}>
                  <div style={{ fontSize: '0.87rem', fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{lesson.title}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`lesson-nav-type type-${lesson.type}`}>{typeLabel[lesson.type]}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lesson.readTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini case preview */}
      {mod.miniCase && (
        <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '22px 26px', marginBottom: 24 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--amber)', marginBottom: 8 }}>Mini Case Study</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>{mod.miniCase.title}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{mod.miniCase.company} · {mod.miniCase.era}</div>
        </div>
      )}

      {/* Future section */}
      {mod.futureSection && (
        <div style={{ background: 'linear-gradient(135deg, var(--amber-light), var(--bg-card))', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '22px 26px', marginBottom: 32 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--amber)', marginBottom: 8 }}>Future of Strategy</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--text)' }}>{mod.futureSection}</div>
        </div>
      )}

      {/* Assessment info banner */}
      {mod.id !== 11 && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '18px 22px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>✦</div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Auto-Graded Assessment</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              This module includes <strong>8 multiple-choice questions</strong> auto-graded instantly by the system. No manual grading required. Score <strong>70% or above</strong> to pass and unlock your module certificate. You may retake as many times as needed.
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-lg" onClick={onStart}>
          {progress.started ? 'Continue Learning →' : 'Start Module →'}
        </button>
        {mod.id !== 11 && !quizPassed && (
          <button className="btn btn-secondary btn-lg" onClick={() => setView('quiz')}>
            {allLessonsDone ? 'Take Assessment →' : 'Preview Assessment'}
          </button>
        )}
        {quizPassed && (
          <button className="btn btn-secondary btn-lg" onClick={() => setView('certificate')}>
            View Certificate ✦
          </button>
        )}
      </div>
    </div>
  );
};

/* Capstone View */
const CapstoneView = ({ mod, progress, onSubmit, updateProgress }) => {
  const [text, setText] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('smc_capstone') || '{}').content || ''; } catch { return ''; }
  });
  const [submitted, setSubmitted] = React.useState(progress.completed || false);
  const [option, setOption] = React.useState('A');

  const save = (val) => {
    setText(val);
    localStorage.setItem('smc_capstone', JSON.stringify({ content: val, option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit();
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  if (submitted) {
    return (
      <div className="capstone-view">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>✦</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, marginBottom: 12 }}>
            Capstone Submitted
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Your integrative strategic analysis has been recorded. Your course certificate is now available.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
              Review Submission
            </button>
            <button className="btn btn-primary" onClick={() => updateProgress(mod.id, { ...progress, completed: true, completedDate: progress.completedDate })}>
              View Certificate →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const options = [
    { id: 'A', label: 'Corporate Strategy Analysis', desc: 'A publicly listed company — full strategic analysis and recommendations' },
    { id: 'B', label: 'Industry Transformation Analysis', desc: 'An industry undergoing disruption — analysis of forces, winners, losers, and prescriptions' },
    { id: 'C', label: 'Entrepreneurial Strategy', desc: 'A new venture or major initiative — business model, positioning, and implementation plan' },
    { id: 'D', label: 'Institutional Strategy', desc: 'A nonprofit, university, or government agency — adapted strategic frameworks for non-market contexts' },
  ];

  return (
    <div className="capstone-view">
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--amber)', marginBottom: 12 }}>Integrative Capstone</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 400, lineHeight: 1.2, marginBottom: 12 }}>Strategic Analysis Project</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 640 }}>
          Synthesize all course frameworks into a coherent strategic analysis. Choose one of the four project options below. Target 4,000–6,000 words of analytical content. The goal is not comprehensiveness — it is intellectual rigor, strategic judgment, and precise, evidence-based recommendation.
        </p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500, marginBottom: 14 }}>Choose Your Project Option</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {options.map(opt => (
            <div
              key={opt.id}
              onClick={() => setOption(opt.id)}
              style={{
                padding: '16px 18px',
                border: '1.5px solid',
                borderColor: option === opt.id ? 'var(--amber)' : 'var(--border)',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                background: option === opt.id ? 'var(--amber-light)' : 'var(--bg-card)',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: option === opt.id ? 'var(--amber-dark)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Option {opt.id}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{opt.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500 }}>Your Analysis</div>
          <div style={{ fontSize: '0.75rem', color: wordCount >= 4000 ? 'oklch(45% 0.12 145)' : 'var(--text-muted)' }}>
            {wordCount.toLocaleString()} words {wordCount >= 4000 && '✓'}
          </div>
        </div>
        <textarea
          className="capstone-textarea"
          style={{ minHeight: 480 }}
          placeholder={`Option ${option}: ${options.find(o=>o.id===option)?.label}\n\nBegin your strategic analysis here. Structure it around:\n1. Context & Organizational Purpose\n2. External Environment Analysis\n3. Internal Capabilities Assessment\n4. Current Strategy Evaluation\n5. Strategic Recommendations\n\nAim for 4,000–6,000 words of substantive analysis.`}
          value={text}
          onChange={e => save(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
          disabled={wordCount < 500}
        >
          Submit Capstone →
        </button>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {wordCount < 500 ? `${500 - wordCount} more words to enable submission` : 'Ready to submit'}
        </span>
      </div>
    </div>
  );
};

window.ModulePage = ModulePage;
window.ModuleOverview = ModuleOverview;
window.CapstoneView = CapstoneView;
