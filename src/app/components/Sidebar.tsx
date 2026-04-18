'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Course } from '../../../lib/markdown';
import { QuizSet } from '../../../lib/quiz';

export default function Sidebar({ courses, quizzes }: { courses: Course[], quizzes: QuizSet[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-slate-50 min-h-screen hidden md:block overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="block mb-8">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            Course Mastery
          </h1>
        </Link>

        <div className="space-y-8">
          {/* Lectures Section */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">
              Study Materials
            </h2>
            <nav className="flex flex-col gap-1">
              {courses.map((course) => {
                const isActive = pathname === `/lecture/${course.id}`;
                return (
                  <Link
                    key={course.id}
                    href={`/lecture/${course.id}`}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {course.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quizzes Section */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">
              Practice Quizzes
            </h2>
            <nav className="flex flex-col gap-1">
              {quizzes.map((quiz) => {
                const isActive = pathname === `/quiz/${quiz.id}`;
                return (
                  <Link
                    key={quiz.id}
                    href={`/quiz/${quiz.id}`}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {quiz.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
