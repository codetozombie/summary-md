'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizSet } from '../../../lib/quiz';

export default function QuizListClient({ quizzes }: { quizzes: QuizSet[] }) {
  const [scores, setScores] = useState<Record<string, { correct: number, total: number, attempted: number }>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedScores: Record<string, { correct: number, total: number, attempted: number }> = {};
    
    quizzes.forEach(quiz => {
      const cacheKey = `quiz-progress-${quiz.id}`;
      const cached = localStorage.getItem(cacheKey);
      
      let correct = 0;
      let attempted = 0;
      const total = quiz.questions.length;

      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const answers = parsed.quizState?.answers || {};
          
          Object.entries(answers).forEach(([idx, ans]) => {
            const q = quiz.questions[Number(idx)];
            if (q) {
              attempted++;
              if (ans === q.correct_answer) correct++;
            }
          });
        } catch (e) {
          console.error('Error parsing quiz cache', e);
        }
      }
      loadedScores[quiz.id] = { correct, total, attempted };
    });

    setScores(loadedScores);
    setIsLoaded(true);
  }, [quizzes]);

  const totalPossible = quizzes.reduce((acc, q) => acc + q.questions.length, 0);
  const totalCorrect = Object.values(scores).reduce((acc, s) => acc + s.correct, 0);
  const overallPct = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;

  if (!isLoaded) return <div className="p-8 text-slate-500">Loading progress...</div>;

  return (
    <div>
      {/* Overall Score Header */}
      <div className="clean-card p-6 mb-8 bg-gradient-to-br from-emerald-50 to-white border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Overall Quiz Score</h2>
          <p className="text-slate-600 text-sm">Combined progress across all available quizzes.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-emerald-600">{totalCorrect} / {totalPossible}</span>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">Correct Answers</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-500 flex items-center justify-center text-lg font-bold text-emerald-700 shadow-sm">
            {overallPct}%
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Available Quizzes</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {quizzes.map((quiz) => {
          const score = scores[quiz.id] || { correct: 0, total: quiz.questions.length, attempted: 0 };
          const isStarted = score.attempted > 0;
          const isFinished = score.attempted === score.total;
          
          return (
            <Link 
              href={`/quiz/${quiz.id}`} 
              key={quiz.id}
              className="clean-card p-5 group hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{quiz.title}</h2>
                  {isFinished ? (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">Completed</span>
                  ) : isStarted ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded">In Progress</span>
                  ) : null}
                </div>
                <p className="text-slate-500 text-sm">{quiz.questions.length} Questions</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Your Score</div>
                  <div className="text-sm font-bold text-slate-800">
                    {score.correct} / {score.total} <span className="text-slate-400 font-normal">correct</span>
                  </div>
                </div>
                {isStarted && (
                   <div className="text-lg font-bold text-emerald-600">
                     {Math.round((score.correct / score.total) * 100)}%
                   </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
