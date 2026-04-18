'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Question, QuizSet } from '../../../../lib/quiz';

type QuizState = {
  answers: Record<number, string>;
};

export default function QuizApp({ quizzes }: { quizzes: QuizSet[] }) {
  const [activeQuizId, setActiveQuizId] = useState<string>(quizzes[0]?.id || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({ answers: {} });
  const [isLoaded, setIsLoaded] = useState(false);
  const [animDir, setAnimDir] = useState<'next' | 'prev'>('next');

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];
  const questions = activeQuiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const touchStartX = useRef<number | null>(null);

  // Score tracking
  const score = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.entries(quizState.answers).forEach(([idx, ans]) => {
      const q = questions[Number(idx)];
      if (q) {
        total++;
        if (ans === q.correct_answer) correct++;
      }
    });
    return { correct, total };
  }, [quizState.answers, questions]);

  useEffect(() => {
    if (!activeQuizId) return;
    const cacheKey = `quiz-progress-${activeQuizId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setQuizState(parsed.quizState || { answers: {} });
        setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
      } catch (e) {
        console.error('Failed to parse cache', e);
      }
    } else {
      setQuizState({ answers: {} });
      setCurrentQuestionIndex(0);
    }
    setIsLoaded(true);
  }, [activeQuizId]);

  useEffect(() => {
    if (!isLoaded || !activeQuizId) return;
    const cacheKey = `quiz-progress-${activeQuizId}`;
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ quizState, currentQuestionIndex })
    );
  }, [quizState, currentQuestionIndex, activeQuizId, isLoaded]);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleAnswerSelect = (answerKey: string) => {
    if (quizState.answers[currentQuestionIndex]) return;
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestionIndex]: answerKey }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimDir('next');
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setAnimDir('prev');
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const resetCache = () => {
    if (!activeQuizId) return;
    const cacheKey = `quiz-progress-${activeQuizId}`;
    localStorage.removeItem(cacheKey);
    setQuizState({ answers: {} });
    setCurrentQuestionIndex(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  if (!quizzes.length) {
    return (
      <div className="glass-card text-center p-8" style={{ color: 'var(--text-secondary)' }}>
        No quizzes available.
      </div>
    );
  }

  if (!isLoaded) return null;

  const selectedAnswer = quizState.answers[currentQuestionIndex];
  const isAnswered = !!selectedAnswer;
  const progressPct = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5">

      {/* Controls Card */}
      <div className="glass-card p-4 sm:p-5 animate-fade-in-up flex flex-col gap-4">

        {/* Quiz select + Reset + Score */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <select
              value={activeQuizId}
              onChange={(e) => {
                setIsLoaded(false);
                setActiveQuizId(e.target.value);
              }}
              className="w-full sm:w-64 appearance-none transition-colors text-sm font-medium rounded-xl p-3 pr-10 focus:outline-none"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              {quizzes.map((q) => (
                <option key={q.id} value={q.id}>{q.title}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
              style={{ color: 'var(--text-tertiary)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Score badge */}
            {score.total > 0 && (
              <div className="text-sm font-semibold px-3 py-1.5 rounded-lg"
                style={{
                  background: 'var(--success-bg)',
                  color: 'var(--success)',
                  border: '1px solid var(--success-border)',
                }}>
                {score.correct}/{score.total} correct
              </div>
            )}
            <button
              onClick={resetCache}
              className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200"
              style={{
                background: 'var(--error-bg)',
                color: 'var(--error)',
                border: '1px solid var(--error-border)',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(251, 113, 133, 0.18)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--error-bg)';
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-semibold tracking-wider uppercase"
            style={{ color: 'var(--text-tertiary)' }}>
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="px-2 py-0.5 rounded-md text-xs font-bold"
              style={{ background: 'var(--accent-glow)', color: 'var(--text-accent)' }}>
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden"
            style={{ background: 'var(--bg-elevated)' }}>
            <div
              className="progress-shimmer h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div
          key={currentQuestionIndex}
          className="glass-card p-5 sm:p-8 min-h-[420px] flex flex-col animate-scale-in"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Question number chip */}
          <div className="inline-flex self-start px-2.5 py-1 rounded-lg text-xs font-bold mb-4 uppercase tracking-wider"
            style={{ background: 'var(--accent-glow)', color: 'var(--text-accent)' }}>
            Q{currentQuestion.question_no}
          </div>

          <h2 className="text-lg sm:text-xl font-bold leading-relaxed mb-6"
            style={{ color: 'var(--text-primary)' }}>
            {currentQuestion.question_text}
          </h2>

          <div className="flex flex-col gap-2.5 flex-grow stagger">
            {Object.entries(currentQuestion.possible_answers).map(([key, value]) => {
              const isSelected = selectedAnswer === key;
              const isCorrectAnswer = currentQuestion.correct_answer === key;

              let cardBg = 'var(--bg-elevated)';
              let cardBorder = 'var(--border-subtle)';
              let textColor = 'var(--text-secondary)';
              let letterBg = 'var(--bg-card)';
              let letterColor = 'var(--text-tertiary)';
              let shadow = 'none';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  cardBg = 'var(--success-bg)';
                  cardBorder = 'var(--success-border)';
                  textColor = 'var(--success)';
                  letterBg = 'var(--success)';
                  letterColor = '#fff';
                  shadow = '0 0 12px rgba(52, 211, 153, 0.15)';
                } else if (isSelected) {
                  cardBg = 'var(--error-bg)';
                  cardBorder = 'var(--error-border)';
                  textColor = 'var(--error)';
                  letterBg = 'var(--error)';
                  letterColor = '#fff';
                  shadow = '0 0 12px rgba(251, 113, 133, 0.15)';
                } else {
                  cardBg = 'var(--bg-card)';
                  cardBorder = 'var(--border-subtle)';
                  textColor = 'var(--text-tertiary)';
                  letterBg = 'var(--bg-elevated)';
                  letterColor = 'var(--text-tertiary)';
                }
              }

              return (
                <button
                  key={key}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(key)}
                  className="animate-fade-in-up group relative flex items-center p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 font-medium"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    color: textColor,
                    boxShadow: shadow,
                    cursor: isAnswered ? 'default' : 'pointer',
                    opacity: isAnswered && !isCorrectAnswer && !isSelected ? 0.5 : 1,
                  }}
                  onMouseOver={(e) => {
                    if (!isAnswered) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-accent)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--shadow-glow)';
                      (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isAnswered) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = cardBorder;
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLButtonElement).style.background = cardBg;
                    }
                  }}
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg mr-3.5 text-sm font-bold transition-all duration-200"
                    style={{ background: letterBg, color: letterColor }}
                  >
                    {key}
                  </span>
                  <span className="flex-grow text-sm sm:text-base">{value}</span>

                  {/* Correct/incorrect icon */}
                  {isAnswered && isCorrectAnswer && (
                    <svg className="w-5 h-5 ml-2 flex-shrink-0" style={{ color: 'var(--success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <svg className="w-5 h-5 ml-2 flex-shrink-0" style={{ color: 'var(--error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          <div className="min-h-[80px] mt-5">
            {isAnswered && (
              <div
                className="p-4 rounded-xl text-sm leading-relaxed animate-scale-in"
                style={{
                  background: selectedAnswer === currentQuestion.correct_answer ? 'var(--success-bg)' : 'var(--error-bg)',
                  border: `1px solid ${selectedAnswer === currentQuestion.correct_answer ? 'var(--success-border)' : 'var(--error-border)'}`,
                  color: selectedAnswer === currentQuestion.correct_answer ? 'var(--success)' : 'var(--error)',
                }}
              >
                <p className="font-semibold mb-1 flex items-center gap-2">
                  {selectedAnswer === currentQuestion.correct_answer ? '✓ Correct' : '✗ Incorrect'}
                </p>
                {currentQuestion.explanation && (
                  <p style={{ color: 'var(--text-secondary)' }} className="mt-1.5 text-sm">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-5 pt-5"
            style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 text-sm"
              style={{
                background: currentQuestionIndex === 0 ? 'transparent' : 'var(--bg-elevated)',
                color: currentQuestionIndex === 0 ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                border: currentQuestionIndex === 0 ? '1px solid transparent' : '1px solid var(--border-subtle)',
                cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentQuestionIndex === 0 ? 0.5 : 1,
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Prev
            </button>

            <div className="text-xs hidden sm:flex items-center gap-1.5"
              style={{ color: 'var(--text-tertiary)' }}>
              <kbd className="px-1.5 py-0.5 rounded text-xs font-mono"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>←</kbd>
              <kbd className="px-1.5 py-0.5 rounded text-xs font-mono"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>→</kbd>
              <span className="ml-1">to navigate</span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 text-sm"
              style={{
                background: currentQuestionIndex === questions.length - 1 ? 'transparent' : 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
                color: currentQuestionIndex === questions.length - 1 ? 'var(--text-tertiary)' : '#fff',
                cursor: currentQuestionIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentQuestionIndex === questions.length - 1 ? 0.5 : 1,
                boxShadow: currentQuestionIndex === questions.length - 1 ? 'none' : '0 2px 8px rgba(99, 102, 241, 0.25)',
              }}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
