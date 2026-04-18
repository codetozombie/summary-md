import Link from 'next/link';
import { getCourses } from '../../../lib/markdown';

export default function LecturesPage() {
  const courses = getCourses();

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="px-5 sm:px-8 py-8 border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Study Materials</h1>
          </div>
          <p className="text-slate-500 text-sm mt-2 ml-11">
            {courses.length} lecture{courses.length !== 1 ? 's' : ''} available — click any to start reading.
          </p>
        </div>
      </div>

      {/* Lecture list */}
      <div className="px-5 sm:px-8 py-6 animate-fade-in-up">
        <div className="max-w-3xl mx-auto flex flex-col gap-2.5">
          {courses.map((course, index) => (
            <Link
              href={`/lecture/${course.id}`}
              key={course.id}
              className="clean-card px-5 py-4 sm:py-5 flex items-center gap-4 hover:border-blue-300 hover:-translate-y-0.5 group"
            >
              {/* Number badge */}
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold font-mono text-sm text-slate-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <div className="grow min-w-0">
                <h2 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                  {course.title}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Lecture {index + 1}</p>
              </div>

              {/* Arrow */}
              <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
