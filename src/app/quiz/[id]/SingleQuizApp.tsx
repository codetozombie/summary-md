'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { QuizSet } from '../../../../lib/quiz';

type QuizState = {
  answers: Record<number, string>;
};

export default function SingleQuizApp({ quiz }: { quiz: QuizSet }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({ answers: {} });
  const [isLoaded, setIsLoaded] = useState(false);

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const touchStartX = useRef<number | null>(null);

  const score = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.entries(quizState.answers).forEach(([idx, ans]) => {
      const q = questions[Number(idx)];
      if (q) { total++; if (ans === q.correct_answer) correct++; }
    });
    return { correct, total };
  }, [quizState.answers, questions]);

  useEffect(() => {
    if (!quiz.id) return;
    const cached = localStorage.getItem(`quiz-progress-${quiz.id}`);
    if (cached) {
      try {
        const p = JSON.parse(cached);
        setQuizState(p.quizState || { answers: {} });
        setCurrentQuestionIndex(p.currentQuestionIndex || 0);
      } catch { /* ignore */ }
    } else {
      setQuizState({ answers: {} });
      setCurrentQuestionIndex(0);
    }
    setIsLoaded(true);
  }, [quiz.id]);

  useEffect(() => {
    if (!isLoaded || !quiz.id) return;
    localStorage.setItem(`quiz-progress-${quiz.id}`,
      JSON.stringify({ quizState, currentQuestionIndex }));
  }, [quizState, currentQuestionIndex, quiz.id, isLoaded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); handlePrev(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleAnswerSelect = (answerKey: string) => {
    if (quizState.answers[currentQuestionIndex]) return;
    setQuizState(prev => ({ ...prev, answers: { ...prev.answers, [currentQuestionIndex]: answerKey } }));
  };

  const handleNext = () => { if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(p => p + 1); };
  const handlePrev = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(p => p - 1); };

  const resetCache = () => {
    if (!quiz.id) return;
    localStorage.removeItem(`quiz-progress-${quiz.id}`);
    setQuizState({ answers: {} });
    setCurrentQuestionIndex(0);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  if (!isLoaded) return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Loading quiz...</p>
      </div>
    </div>
  );

  const selectedAnswer = quizState.answers[currentQuestionIndex];
  const isAnswered = !!selectedAnswer;
  const isCorrect = selectedAnswer === currentQuestion?.correct_answer;
  const progressPct = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(quizState.answers).length;
  const allDone = answeredCount === questions.length;

  return (
    <div className="flex flex-col gap-4">

      {/* ── Header ── */}
      <div className="clean-card overflow-hidden animate-fade-in-up">
        {/* Top bar */}
        <div className="px-5 py-4 flex items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">{quiz.title}</h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {score.total > 0 && (
              <span className="hidden sm:inline-flex badge badge-green text-[11px]">
                {score.correct}/{score.total} correct
              </span>
            )}
            <button
              onClick={resetCache}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress section */}
        <div className="px-5 py-3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">
              Question <span className="text-slate-800">{currentQuestionIndex + 1}</span> of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              {score.total > 0 && (
                <span className="sm:hidden badge badge-green text-[10px]">
                  {score.correct}/{score.total}
                </span>
              )}
              <span className="badge badge-blue text-[10px]">{Math.round(progressPct)}%</span>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Question dot nav */}
        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
          {questions.map((_, i) => {
            const ans = quizState.answers[i];
            const done = !!ans;
            const correct = done && ans === questions[i].correct_answer;
            const isCurrent = i === currentQuestionIndex;
            return (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                title={`Question ${i + 1}`}
                className="transition-all"
                style={{
                  width: isCurrent ? 24 : 10,
                  height: 10,
                  borderRadius: 999,
                  background: isCurrent
                    ? '#2563eb'
                    : done
                      ? correct ? '#10b981' : '#f43f5e'
                      : '#e2e8f0',
                  border: isCurrent ? '2px solid #1d4ed8' : 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ── Question Card ── */}
      {currentQuestion && (
        <div
          key={currentQuestionIndex}
          className="clean-card p-5 sm:p-8 flex flex-col animate-scale-in"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Question header */}
          <div className="flex items-center justify-between mb-5">
            <span className="badge badge-blue">Q{currentQuestion.question_no}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 sm:hidden flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Swipe to navigate
            </span>
          </div>

          {/* Question text */}
          <h2 className="text-base sm:text-xl font-bold leading-relaxed mb-6 text-slate-900">
            {currentQuestion.question_text}
          </h2>

          {/* Answer options */}
          <div className="flex flex-col gap-3 stagger">
            {Object.entries(currentQuestion.possible_answers).map(([key, value]) => {
              const isSelected = selectedAnswer === key;
              const isCorrectAnswer = currentQuestion.correct_answer === key;

              let card = 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50';
              let badge = 'bg-slate-100 text-slate-500';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  card = 'border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm';
                  badge = 'bg-emerald-500 text-white';
                } else if (isSelected) {
                  card = 'border-rose-300 bg-rose-50 text-rose-900 shadow-sm';
                  badge = 'bg-rose-500 text-white';
                } else {
                  card = 'border-slate-100 bg-white text-slate-400 opacity-50';
                  badge = 'bg-slate-50 text-slate-400';
                }
              }

              return (
                <button
                  key={key}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(key)}
                  className={`animate-fade-in-up group flex items-center p-4 rounded-xl text-left transition-all duration-150 font-medium border ${card} ${!isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'}`}
                >
                  <span className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg mr-4 text-sm font-bold transition-colors ${badge}`}>
                    {key}
                  </span>
                  <span className="grow text-sm sm:text-base leading-snug">{value}</span>
                  {isAnswered && isCorrectAnswer && (
                    <svg className="w-5 h-5 ml-2 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <svg className="w-5 h-5 ml-2 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`mt-5 p-4 rounded-xl text-sm leading-relaxed animate-scale-in border ${
              isCorrect
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}>
              <p className="font-bold mb-1.5 flex items-center gap-2 text-base">
                {isCorrect ? (
                  <><span className="text-emerald-600">✓</span> Correct!</>
                ) : (
                  <><span className="text-rose-500">✗</span> Incorrect — correct answer: {currentQuestion.correct_answer}</>
                )}
              </p>
              {currentQuestion.explanation && (
                <p className="text-sm opacity-85 leading-relaxed">{currentQuestion.explanation}</p>
              )}
            </div>
          )}

          {/* All done banner */}
          {allDone && currentQuestionIndex === questions.length - 1 && (
            <div className="mt-4 p-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-800 text-sm font-semibold flex items-center gap-2 animate-scale-in">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Quiz complete! You scored {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`flex-1 sm:flex-none px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all ${
                currentQuestionIndex === 0
                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sm:inline">Previous</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-xs mx-auto">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px]">→</kbd>
              <span className="ml-0.5">navigate</span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className={`flex-1 sm:flex-none px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                currentQuestionIndex === questions.length - 1
                  ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
              }`}
            >
              <span className="sm:inline">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
