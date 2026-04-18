'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizSet } from '../../../lib/quiz';

export default function QuizListClient({ quizzes }: { quizzes: QuizSet[] }) {
  const [scores, setScores] = useState<Record<string, { correct: number, total: number, attempted: number }>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded: Record<string, { correct: number, total: number, attempted: number }> = {};
    quizzes.forEach(quiz => {
      const cached = localStorage.getItem(`quiz-progress-${quiz.id}`);
      let correct = 0, attempted = 0;
      const total = quiz.questions.length;
      if (cached) {
        try {
          const p = JSON.parse(cached);
          const answers = p.quizState?.answers || {};
          Object.entries(answers).forEach(([idx, ans]) => {
            const q = quiz.questions[Number(idx)];
            if (q) { attempted++; if (ans === q.correct_answer) correct++; }
          });
        } catch { /* ignore */ }
      }
      loaded[quiz.id] = { correct, total, attempted };
    });
    setScores(loaded);
    setIsLoaded(true);
  }, [quizzes]);

  const totalPossible = quizzes.reduce((a, q) => a + q.questions.length, 0);
  const totalCorrect = Object.values(scores).reduce((a, s) => a + s.correct, 0);
  const totalAttempted = Object.values(scores).reduce((a, s) => a + s.attempted, 0);
  const overallPct = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;

  if (!isLoaded) return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Loading scores...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">

      {/* ── Overall Score Banner ── */}
      <div className="clean-card overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a3a5c 100%)', border: 'none' }}>
        <div className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-300/70 mb-1">Overall Progress</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              {totalCorrect} <span className="text-white/40 font-normal text-lg">/ {totalPossible}</span> correct
            </h2>
            <p className="text-blue-200/60 text-sm">{totalAttempted} of {totalPossible} questions attempted</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Circular progress */}
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9155" fill="none"
                  stroke={overallPct >= 70 ? '#10b981' : overallPct >= 40 ? '#f59e0b' : '#f43f5e'}
                  strokeWidth="3"
                  strokeDasharray={`${overallPct} ${100 - overallPct}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.6s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{overallPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="px-6 pb-5">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${overallPct}%`,
                background: overallPct >= 70 ? '#10b981' : overallPct >= 40 ? '#f59e0b' : '#f43f5e',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Quiz Grid ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">
          Available Quizzes — {quizzes.length} total
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 stagger">
          {quizzes.map((quiz) => {
            const score = scores[quiz.id] || { correct: 0, total: quiz.questions.length, attempted: 0 };
            const isStarted = score.attempted > 0;
            const isFinished = score.attempted === score.total;
            const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

            return (
              <Link
                href={`/quiz/${quiz.id}`}
                key={quiz.id}
                className="clean-card p-5 flex flex-col gap-4 hover:border-emerald-300 hover:-translate-y-0.5 group animate-fade-in-up"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                      <svg className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                        {quiz.title}
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">{quiz.questions.length} questions</p>
                    </div>
                  </div>

                  {isFinished ? (
                    <span className="badge badge-green shrink-0">Done</span>
                  ) : isStarted ? (
                    <span className="badge badge-blue shrink-0">In progress</span>
                  ) : (
                    <span className="badge badge-slate shrink-0">Not started</span>
                  )}
                </div>

                {/* Score row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-0.5">Score</p>
                    <p className="text-sm font-bold text-slate-800">
                      {score.correct} <span className="text-slate-400 font-normal">/ {score.total}</span>
                    </p>
                  </div>
                  {isStarted && (
                    <span className={`text-xl font-bold ${pct >= 70 ? 'text-emerald-600' : pct >= 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                      {pct}%
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(score.attempted / score.total) * 100}%`,
                        background: isFinished
                          ? (pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#f43f5e')
                          : 'linear-gradient(90deg, #2563eb, #6366f1)',
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 text-right">
                    {score.attempted}/{score.total} attempted
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
