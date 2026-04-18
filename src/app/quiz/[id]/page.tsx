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
    <main className="p-4 sm:p-8 md:p-12 animate-fade-in-up">
      <div className="max-w-3xl mx-auto">
        <SingleQuizApp quiz={quiz} />
      </div>
    </main>
  );
}
