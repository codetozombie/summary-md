import Link from 'next/link';
import { getCourses } from '../../../lib/markdown';

export default function LecturesPage() {
  const courses = getCourses();

  return (
    <main className="p-4 sm:p-8 md:p-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">All Study Materials</h1>
        <p className="text-slate-600 mb-8">Access all your lecture notes and course summaries here.</p>

        <div className="grid gap-4">
          {courses.map((course, index) => (
            <Link 
              href={`/lecture/${course.id}`} 
              key={course.id}
              className="clean-card p-6 flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-mono text-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {index + 1}
                </div>
                <h2 className="text-lg font-semibold text-slate-800">{course.title}</h2>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
