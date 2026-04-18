import { getCourses } from '../../lib/markdown';
import CourseTabs from './components/CourseTabs';
import QuizButton from './components/QuizButton';

export default function Home() {
  const courses = getCourses();

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99, 102, 241, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(99, 102, 241, 0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

        {/* Hero Header */}
        <div className="glass-card p-6 sm:p-8 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--accent-glow)', border: '1px solid var(--border-accent)' }}>
                  <svg className="w-4 h-4" style={{ color: 'var(--text-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--text-tertiary)' }}>
                  Study Platform
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}>
                Course Mastery
              </h1>
              <p className="mt-2 text-base"
                style={{ color: 'var(--text-secondary)' }}>
                Dive into your curriculum and validate your knowledge.
              </p>
            </div>
            <QuizButton />
          </div>
        </div>

        <CourseTabs courses={courses} />
      </div>
    </main>
  );
}