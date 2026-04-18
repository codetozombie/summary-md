'use client';

import { useState, useEffect } from 'react';
import { QuizSet } from '../../../lib/quiz';

export default function OverallScoreCard({ quizzes }: { quizzes: QuizSet[] }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  
  const totalPossible = quizzes.reduce((acc, q) => acc + q.questions.length, 0);

  useEffect(() => {
    let correct = 0;
    
    quizzes.forEach(quiz => {
      const cacheKey = `quiz-progress-${quiz.id}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const answers = parsed.quizState?.answers || {};
          
          Object.entries(answers).forEach(([idx, ans]) => {
            const q = quiz.questions[Number(idx)];
            if (q && ans === q.correct_answer) {
              correct++;
            }
          });
        } catch (e) {
          // ignore cache errors
        }
      }
    });

    setTotalCorrect(correct);
    setIsLoaded(true);
  }, [quizzes]);

  const overallPct = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;

  if (!isLoaded) return null;

  return (
    <div className="clean-card p-6 flex flex-col items-start hover:-translate-y-1 transition-transform duration-200">
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-2 text-slate-900">Overall Progress</h2>
      <p className="text-slate-600 mb-6 text-sm flex-grow">
        You have answered <strong className="text-slate-800">{totalCorrect}</strong> out of <strong className="text-slate-800">{totalPossible}</strong> questions correctly across all quizzes.
      </p>
      
      <div className="w-full mt-auto">
        <div className="flex justify-between items-center mb-1 text-xs font-bold text-slate-500 uppercase">
          <span>Completion</span>
          <span className="text-indigo-600">{overallPct}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${overallPct}%` }}></div>
        </div>
      </div>
    </div>
  );
}
