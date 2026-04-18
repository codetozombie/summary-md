import Link from 'next/link';
import { getCourses } from '../../lib/markdown';
import { getQuizzes } from '../../lib/quiz';
import OverallScoreCard from './components/OverallScoreCard';

export default function Home() {
  const courses = getCourses();
  const quizzes = getQuizzes();

  const firstCourse = courses[0];
  const firstQuiz = quizzes[0];

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-blue" style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)' }}>
              Study Platform
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-3">
            Welcome back —<br />
            <span style={{
              background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              keep learning.
            </span>
          </h1>
          <p className="text-blue-200/70 text-base sm:text-lg max-w-xl leading-relaxed">
            Access all your lecture notes and practice quizzes in one place. Your progress is always saved.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { value: courses.length, label: 'Lectures' },
              { value: quizzes.length, label: 'Practice Quizzes' },
              { value: quizzes.reduce((a, q) => a + q.questions.length, 0), label: 'Questions' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
                <span className="text-xs text-blue-300/60 font-medium uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards section */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 stagger">

          {/* Lecture CTA */}
          {firstCourse && (
            <div className="clean-card p-6 flex flex-col hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Start Reading</p>
              <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">Lecture Notes</h2>
              <p className="text-slate-500 text-sm grow mb-5 leading-relaxed">
                Begin with <span className="font-semibold text-slate-700">{firstCourse.title}</span> or browse all {courses.length} materials.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href={`/lecture/${firstCourse.id}`}
                  className="btn btn-primary w-full justify-center"
                >
                  Open First Lecture
                </Link>
                <Link
                  href="/lectures"
                  className="text-center text-xs text-slate-500 hover:text-blue-600 transition-colors py-1 font-medium"
                >
                  View all lectures →
                </Link>
              </div>
            </div>
          )}

          {/* Quiz CTA */}
          {firstQuiz && (
            <div className="clean-card p-6 flex flex-col hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">Practice</p>
              <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">Quizzes</h2>
              <p className="text-slate-500 text-sm grow mb-5 leading-relaxed">
                Test your knowledge with <span className="font-semibold text-slate-700">{firstQuiz.title}</span> and track your score.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href={`/quiz/${firstQuiz.id}`}
                  className="btn w-full justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #059669, #0d9488)', boxShadow: '0 1px 3px rgba(5,150,105,0.3)' }}
                >
                  Start Quiz
                </Link>
                <Link
                  href="/quizzes"
                  className="text-center text-xs text-slate-500 hover:text-emerald-600 transition-colors py-1 font-medium"
                >
                  View all quizzes →
                </Link>
              </div>
            </div>
          )}

          {/* Score Card */}
          <OverallScoreCard quizzes={quizzes} />
        </div>

        {/* Recent lectures quick-access */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Recent Lectures</h2>
            <Link href="/lectures" className="text-xs text-blue-600 font-semibold hover:underline">View all</Link>
          </div>
          <div className="grid gap-2">
            {courses.slice(0, 5).map((course, i) => (
              <Link
                key={course.id}
                href={`/lecture/${course.id}`}
                className="clean-card px-5 py-3.5 flex items-center gap-4 hover:border-blue-200 hover:-translate-y-0.5 group"
              >
                <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-slate-700 grow truncate group-hover:text-slate-900">{course.title}</span>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
