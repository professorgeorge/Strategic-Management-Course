// components/LessonView.jsx

const LessonView = ({ mod, lesson, onComplete, isCompleted, onNext, onPrev, hasNext, hasPrev }) => {
  const content = window.LESSON_CONTENT[lesson.id] || '<p class="lesson-lead">Content loading…</p>';

  const typeLabel = {
    concept: 'Concept', framework: 'Framework', tool: 'Tool',
    disruptive: 'Disruptive Insight', future: 'Future of Strategy',
    brief: 'Project Brief'
  };

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <div className="lesson-breadcrumb">
          <span style={{ color: mod.color, fontWeight: 600 }}>Module {mod.id}</span>
          <span>›</span>
          <span>Lesson {lesson.id}</span>
        </div>
        <h1 className="lesson-title">{lesson.title}</h1>
        <div className="lesson-meta">
          <span className={`lesson-nav-type type-${lesson.type}`}>{typeLabel[lesson.type] || lesson.type}</span>
          <span className="lesson-meta-dot"></span>
          <span>{lesson.readTime} read</span>
        </div>
      </div>

      <div
        className="lesson-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', gap: 12 }}>
        <button
          className="btn btn-secondary"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          ← Previous
        </button>

        <div style={{ display: 'flex', gap: 12 }}>
          {!isCompleted ? (
            <button className="btn btn-primary" onClick={onComplete}>
              Mark Complete ✓
            </button>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'oklch(50% 0.12 145)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              ✓ Completed
            </span>
          )}
          {hasNext && (
            <button className="btn btn-primary" onClick={onNext}>
              Next Lesson →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

window.LessonView = LessonView;
