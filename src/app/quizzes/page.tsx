import { getQuizzes } from '../../../lib/quiz';
import QuizListClient from './QuizListClient';

export default function QuizzesPage() {
  const quizzes = getQuizzes();

  return (
    <main className="p-4 sm:p-8 md:p-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Practice Quizzes</h1>
        <p className="text-slate-600 mb-8">Test your knowledge and track your progress across all topics.</p>

        <QuizListClient quizzes={quizzes} />
      </div>
    </main>
  );
}
