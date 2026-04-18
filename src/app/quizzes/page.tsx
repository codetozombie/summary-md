import { getQuizzes } from '../../../lib/quiz';
import QuizListClient from './QuizListClient';

export default function QuizzesPage() {
  const quizzes = getQuizzes();

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="px-5 sm:px-8 py-8 border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Practice Quizzes</h1>
          </div>
          <p className="text-slate-500 text-sm mt-2 ml-11">
            Test your knowledge and track your progress across all {quizzes.length} quizzes.
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <QuizListClient quizzes={quizzes} />
        </div>
      </div>
    </main>
  );
}
