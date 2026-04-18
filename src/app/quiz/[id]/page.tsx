import { getQuizzes } from '../../../../lib/quiz';
import SingleQuizApp from './SingleQuizApp';

export default async function QuizRoutePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const quizzes = getQuizzes();
  const quiz = quizzes.find(q => q.id === id);

  if (!quiz) {
    return <div className="p-8 text-slate-500">Quiz not found.</div>;
  }

  return (
    <main className="min-h-screen px-4 sm:px-8 py-6">
      <div className="max-w-3xl mx-auto">
        <SingleQuizApp quiz={quiz} />
      </div>
    </main>
  );
}
