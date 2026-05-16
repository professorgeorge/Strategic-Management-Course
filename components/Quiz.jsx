// components/Quiz.jsx

const Quiz = ({ mod, onPass, onFail, existingScore }) => {
  const assessment = window.COURSE_ASSESSMENTS[mod.id];
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [revealed, setRevealed] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(existingScore || null);
  const [showReview, setShowReview] = React.useState(false);

  if (!assessment) return (
    <div className="quiz-view">
      <div className="empty-state">
        <div className="empty-state-title">Assessment Not Available</div>
      </div>
    </div>
  );

  const questions = assessment.questions;
  const q = questions[current];
  const totalQ = questions.length;
  const letters = ['A','B','C','D'];

  const handleSelect = (idx) => {
    if (revealed[q.id]) return;
    setAnswers(prev => ({ ...prev, [q.id]: idx }));
  };

  const handleReveal = () => {
    if (answers[q.id] === undefined) return;
    setRevealed(prev => ({ ...prev, [q.id]: true }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(qu => {
      if (answers[qu.id] === qu.correct) correct++;
    });
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setSubmitted(true);
    if (pct >= assessment.passingScore) onPass(pct);
    else onFail(pct);
  };

  const allAnswered = questions.every(qu => answers[qu.id] !== undefined);

  if (submitted && score !== null && !showReview) {
    const passed = score >= assessment.passingScore;
    return (
      <div className="quiz-view">
        <div className="quiz-result">
          <div className="result-score">{score}%</div>
          <div className="result-label">Your Score</div>
          <div className={`result-status ${passed ? 'result-pass' : 'result-fail'}`}>
            {passed ? '✓ Assessment Passed' : '✗ Not Yet Passed'}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 28px', lineHeight: 1.7 }}>
            {passed
              ? `Excellent work. You scored ${score}% — above the ${assessment.passingScore}% passing threshold. Your module certificate is now available.`
              : `You scored ${score}%. A score of ${assessment.passingScore}% or above is required to pass. Review the material and try again.`}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => setShowReview(true)}>
              Review Answers
            </button>
            {!passed && (
              <button className="btn btn-primary" onClick={() => {
                setAnswers({}); setRevealed({}); setSubmitted(false); setScore(null); setCurrent(0);
              }}>
                Retake Assessment
              </button>
            )}
            {passed && (
              <button className="btn btn-primary" onClick={() => onPass(score)}>
                View Certificate →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="quiz-view">
        <div className="quiz-header">
          <h1 className="quiz-title">Assessment Review</h1>
          <p className="quiz-meta">Module {mod.id} — {assessment.title}</p>
        </div>
        {questions.map((qu, qi) => {
          const userAns = answers[qu.id];
          const isCorrect = userAns === qu.correct;
          return (
            <div className="question-card" key={qu.id}>
              <div className="question-number">Question {qi + 1} of {totalQ}</div>
              <div className="question-text">{qu.question}</div>
              <div className="options-list">
                {qu.options.map((opt, oi) => {
                  let cls = 'option-btn';
                  if (oi === qu.correct) cls += ' correct';
                  else if (oi === userAns && !isCorrect) cls += ' incorrect';
                  return (
                    <div key={oi} className={cls} style={{ cursor: 'default' }}>
                      <span className="option-letter">{letters[oi]}</span>
                      {opt}
                    </div>
                  );
                })}
              </div>
              <div className="explanation-box">
                <strong>Explanation: </strong>{qu.explanation}
              </div>
            </div>
          );
        })}
        <button className="btn btn-secondary" onClick={() => setShowReview(false)}>
          ← Back to Results
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-view">
      <div className="quiz-header">
        <h1 className="quiz-title">Module Assessment</h1>
        <p className="quiz-meta">{assessment.title} · {totalQ} questions · {assessment.passingScore}% to pass</p>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${((current + 1) / totalQ) * 100}%` }}></div>
        </div>
        <div className="quiz-progress-label">Question {current + 1} of {totalQ}</div>
      </div>

      <div className="question-card">
        <div className="question-number">Question {current + 1}</div>
        <div className="question-text">{q.question}</div>
        <div className="options-list">
          {q.options.map((opt, oi) => {
            let cls = 'option-btn';
            const isSelected = answers[q.id] === oi;
            const isRev = revealed[q.id];
            if (isRev) {
              if (oi === q.correct) cls += ' correct';
              else if (isSelected && oi !== q.correct) cls += ' incorrect';
            } else if (isSelected) {
              cls += ' selected';
            }
            return (
              <button
                key={oi}
                className={cls}
                onClick={() => handleSelect(oi)}
                disabled={isRev}
              >
                <span className="option-letter">{letters[oi]}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {revealed[q.id] && (
          <div className="explanation-box">
            <strong>Explanation: </strong>{q.explanation}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrent(c => Math.max(0, c - 1))}
            disabled={current === 0}
          >← Prev</button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrent(c => Math.min(totalQ - 1, c + 1))}
            disabled={current === totalQ - 1}
          >Next →</button>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {answers[q.id] !== undefined && !revealed[q.id] && (
            <button className="btn btn-ghost btn-sm" onClick={handleReveal}>
              Check Answer
            </button>
          )}
          {allAnswered && current === totalQ - 1 && (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
          {allAnswered && current < totalQ - 1 && (
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrent(totalQ - 1)}>
              Go to Last →
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 24 }}>
        {questions.map((qu, qi) => (
          <div
            key={qi}
            onClick={() => setCurrent(qi)}
            style={{
              width: 28, height: 28,
              borderRadius: 4,
              border: '1.5px solid',
              borderColor: qi === current ? 'var(--amber)' : answers[qu.id] !== undefined ? 'oklch(55% 0.12 145)' : 'var(--border)',
              background: qi === current ? 'var(--amber-light)' : answers[qu.id] !== undefined ? 'oklch(93% 0.05 145)' : 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 600,
              color: qi === current ? 'var(--amber-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            {qi + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

window.Quiz = Quiz;
