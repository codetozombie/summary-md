import { getQuizzes } from '../../../lib/quiz';
import QuizApp from './components/QuizApp';
import BackLink from './components/BackLink';

export default function QuizPage() {
  const quizzes = getQuizzes();

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99, 102, 241, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(99, 102, 241, 0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-4 sm:px-8 py-8 sm:py-12">
        {/* Back link + Header */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
          <BackLink />

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}>
              Interactive Quiz
            </h1>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Test your knowledge. Your progress is securely cached.
            </p>
          </div>
        </div>

        <QuizApp quizzes={quizzes} />
      </div>
    </main>
  );
}
