'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Course } from '../../../lib/markdown';
import { QuizSet } from '../../../lib/quiz';

export default function Sidebar({ courses, quizzes }: { courses: Course[], quizzes: QuizSet[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col min-h-screen overflow-y-auto sticky top-0 h-screen"
      style={{ background: 'var(--bg-sidebar)' }}>

      {/* Logo / Brand */}
      <Link href="/" className="flex items-center gap-3 px-5 py-5 border-b border-white/10 hover:opacity-90 transition-opacity">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Course Mastery</p>
          <p className="text-white/40 text-[10px] font-medium">Study Platform</p>
        </div>
      </Link>

      <nav className="flex flex-col flex-1 p-3 gap-6 overflow-y-auto">

        {/* Home link */}
        <div className="mt-1">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              pathname === '/'
                ? 'bg-white/15 text-white'
                : 'text-white/50 hover:bg-white/8 hover:text-white/80'
            }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill={pathname === '/' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Study Materials */}
        <div>
          <div className="flex items-center gap-2 px-3 mb-2">
            <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Study Materials</span>
            <span className="ml-auto text-[10px] text-white/25 font-semibold">{courses.length}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {courses.map((course, i) => {
              const isActive = pathname === `/lecture/${course.id}`;
              return (
                <Link
                  key={course.id}
                  href={`/lecture/${course.id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group ${
                    isActive
                      ? 'bg-blue-600/20 text-white border border-blue-500/30'
                      : 'text-white/50 hover:bg-white/6 hover:text-white/80'
                  }`}
                >
                  <span className={`text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? 'bg-blue-500 text-white' : 'bg-white/8 text-white/30 group-hover:bg-white/15 group-hover:text-white/60'
                  }`}>
                    {i + 1}
                  </span>
                  <span className="truncate text-xs leading-tight">{course.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Practice Quizzes */}
        <div>
          <div className="flex items-center gap-2 px-3 mb-2">
            <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Quizzes</span>
            <span className="ml-auto text-[10px] text-white/25 font-semibold">{quizzes.length}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {quizzes.map((quiz) => {
              const isActive = pathname === `/quiz/${quiz.id}`;
              return (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group ${
                    isActive
                      ? 'bg-emerald-600/20 text-white border border-emerald-500/30'
                      : 'text-white/50 hover:bg-white/6 hover:text-white/80'
                  }`}
                >
                  <svg className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'text-white/25 group-hover:text-white/50'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="truncate text-xs">{quiz.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </nav>

      {/* Bottom footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-[10px] text-white/25 text-center">Progress saved automatically</p>
      </div>
    </aside>
  );
}
