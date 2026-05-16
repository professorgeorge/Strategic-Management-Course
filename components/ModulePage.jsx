// components/ModulePage.jsx
// All modules (including Module 11) use identical MCQ assessment flow

const ModulePage = ({ mod, progress, updateProgress, setRoute, studentName }) => {
  const [view, setView] = React.useState('overview');
  const p = progress[mod.id] || {};
  const lessons = mod.lessons;

  const isLessonDone = (lessonId) => !!(p.lessons && p.lessons[lessonId]);
  const allLessonsDone = lessons.every(l => isLessonDone(l.id));
  const quizPassed = (p.quizScore || 0) >= 70;

  const completeLesson = (lessonId) => {
    updateProgress(mod.id, {
      ...p,
      started: true,
      lessons: { ...(p.lessons || {}), [lessonId]: true }
    });
  };

  const handleQuizPass = (score) => {
    updateProgress(mod.id, {
      ...p, quizScore: score,
      completed: true,
      completedDate: new Date().toISOString()
    });
    setView('certificate');
  };

  const handleQuizFail = (score) => {
    updateProgress(mod.id, { ...p, quizScore: score });
  };

  const getLessonIdx = (id) => lessons.findIndex(l => l.id === id);
  const currentLessonObj = lessons.find(l => l.id === view);

  const typeLabel = {
    concept: 'Concept', framework: 'Framework', tool: 'Tool',
    disruptive: 'Disruptive', future: 'Future', brief: 'Brief'
  };

  return (
    <div className="module-page">

      {/* ── Lesson Sidebar ────────────────────────────────────────────── */}
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
              <div className="lesson-nav-time">Objectives &amp; Plan</div>
            </div>
          </div>

          {/* Lessons */}
          {lessons.map((lesson) => {
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
                    {typeLabel[lesson.type] || lesson.type}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Assessment — available for every module, always clickable */}
          <div
            className={`lesson-nav-item ${view === 'quiz' ? 'active' : ''} ${quizPassed ? 'completed' : ''}`}
            onClick={() => setView('quiz')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`lesson-nav-check ${quizPassed ? 'done' : view === 'quiz' ? 'active-ring' : ''}`}>
              {quizPassed ? '✓' : ''}
            </div>
            <div className="lesson-nav-text">
              <div className="lesson-nav-title">
                {mod.id === 11 ? 'Capstone Assessment' : 'Module Assessment'}
              </div>
              <div className="lesson-nav-time">
                {quizPassed
                  ? `Passed · ${p.quizScore}%`
                  : 'MCQ · Auto-graded · 70% to pass'}
              </div>
            </div>
          </div>

          {/* Certificate — unlocked after passing */}
          {p.completed && (
            <div
              className={`lesson-nav-item ${view === 'certificate' ? 'active' : ''}`}
              onClick={() => setView('certificate')}
            >
              <div className="lesson-nav-check done">★</div>
              <div className="lesson-nav-text">
                <div className="lesson-nav-title">
                  {mod.id === 11 ? 'Course Certificate' : 'Module Certificate'}
                </div>
                <div className="lesson-nav-time">View &amp; Download</div>
              </div>
            </div>
          )}

        </div>

        <div className="lesson-sidebar-actions">
          {!quizPassed && (
            <button
              className="btn btn-primary btn-sm btn-full"
              onClick={() => setView('quiz')}
            >
              {allLessonsDone ? 'Take Assessment →' : 'Preview Assessment →'}
            </button>
          )}
          {p.completed && (
            <button
              className="btn btn-secondary btn-sm btn-full"
              onClick={() => setView('certificate')}
            >
              View Certificate ✦
            </button>
          )}
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="lesson-content-area">

        {view === 'overview' && (
          <ModuleOverview
            mod={mod}
            onStart={() => setView(lessons[0].id)}
            progress={p}
            quizPassed={quizPassed}
            setView={setView}
            allLessonsDone={allLessonsDone}
          />
        )}

        {currentLessonObj && (
          <LessonView
            mod={mod}
            lesson={currentLessonObj}
            isCompleted={isLessonDone(currentLessonObj.id)}
            onComplete={() => completeLesson(currentLessonObj.id)}
            onNext={() => {
              const idx = getLessonIdx(currentLessonObj.id);
              if (idx < lessons.length - 1) setView(lessons[idx + 1].id);
              else setView('quiz');
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

        {view === 'quiz' && (
          <Quiz
            mod={mod}
            onPass={handleQuizPass}
            onFail={handleQuizFail}
            existingScore={p.quizScore}
          />
        )}

        {view === 'certificate' && p.completed && (
          <Certificate
            mod={mod}
            isFinal={mod.id === 11}
            studentName={studentName || p.studentName}
            completedDate={p.completedDate}
            certId={p.certId || ('SMC-M' + mod.id + '-' + Date.now().toString(36).toUpperCase())}
          />
        )}

      </div>
    </div>
  );
};

/* ── Module Overview ────────────────────────────────────────────────────── */
const ModuleOverview = ({ mod, onStart, progress, quizPassed, setView, allLessonsDone }) => {
  const completedLessons = Object.values(progress.lessons || {}).filter(Boolean).length;
  const total = mod.lessons.length;

  const typeLabel = {
    concept: 'Concept', framework: 'Framework', tool: 'Tool',
    disruptive: 'Disruptive', future: 'Future', brief: 'Brief'
  };

  return (
    <div className="module-overview">
      {/* Header */}
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
              ✓ Assessment Passed · {progress.quizScore}%
            </span>
          )}
        </div>
      </div>

      {/* Learning Objectives */}
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

      {/* Auto-graded MCQ banner */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '18px 22px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>✦</div>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            Auto-Graded Multiple Choice Assessment
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            <strong>8 multiple-choice questions</strong>, graded instantly by the system. No essays. No manual grading.
            Score <strong>70% or above</strong> to pass and unlock your certificate. Unlimited retakes allowed.
          </div>
        </div>
      </div>

      {/* Lesson Plan */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500, marginBottom: 16 }}>Lesson Plan</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mod.lessons.map((lesson, idx) => {
            const done = progress.lessons && progress.lessons[lesson.id];
            return (
              <div
                key={lesson.id}
                onClick={() => setView(lesson.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '10px 0', borderBottom: idx < mod.lessons.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}
              >
                <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid', borderColor: done ? '#22c55e' : 'var(--border-md)', background: done ? '#f0fdf4' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: done ? '#22c55e' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>
                  {done ? '✓' : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.87rem', fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{lesson.title}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`lesson-nav-type type-${lesson.type}`}>{typeLabel[lesson.type] || lesson.type}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lesson.readTime}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Assessment row */}
          <div
            onClick={() => setView('quiz')}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '10px 0', cursor: 'pointer' }}
          >
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid', borderColor: quizPassed ? '#22c55e' : 'var(--amber)', background: quizPassed ? '#f0fdf4' : 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: quizPassed ? '#22c55e' : 'var(--amber-dark)', flexShrink: 0, marginTop: 1 }}>
              {quizPassed ? '✓' : '?'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.87rem', fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>
                {mod.id === 11 ? 'Capstone Assessment' : 'Module Assessment'}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="lesson-nav-type type-framework">MCQ · Auto-graded</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>8 questions · 70% to pass</span>
                {quizPassed && <span style={{ fontSize: '0.7rem', color: 'oklch(45% 0.12 145)', fontWeight: 600 }}>Score: {progress.quizScore}%</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini case */}
      {mod.miniCase && (
        <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--amber)', marginBottom: 6 }}>Mini Case Study</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{mod.miniCase.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{mod.miniCase.company} · {mod.miniCase.era}</div>
        </div>
      )}

      {/* Future section */}
      {mod.futureSection && (
        <div style={{ background: 'var(--amber-light)', border: '1px solid rgba(200,122,40,0.25)', borderRadius: 'var(--radius)', padding: '20px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--amber)', marginBottom: 6 }}>Future of Strategy</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>{mod.futureSection}</div>
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-lg" onClick={onStart}>
          {progress.started ? 'Continue Learning →' : 'Start Module →'}
        </button>
        {!quizPassed && (
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

window.ModulePage = ModulePage;
window.ModuleOverview = ModuleOverview;
