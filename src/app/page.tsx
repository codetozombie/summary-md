import Link from 'next/link';
import { getCourses } from '../../lib/markdown';
import { getQuizzes } from '../../lib/quiz';

export default function Home() {
  const courses = getCourses();
  const quizzes = getQuizzes();

  const firstCourse = courses[0];
  const firstQuiz = quizzes[0];

  return (
    <main className="p-8 sm:p-12 animate-fade-in-up">
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Welcome to Course Mastery
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
          Select a lecture or quiz from the sidebar to begin your study session. All your quiz progress is automatically saved to your browser so you won't lose your place.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Quick Start: Lecture */}
          {firstCourse && (
            <div className="clean-card p-6 flex flex-col items-start hover:-translate-y-1 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-slate-900">Start Reading</h2>
              <p className="text-slate-600 mb-6 text-sm flex-grow">
                Begin with your first study material: <span className="font-semibold text-slate-800">{firstCourse.title}</span>.
              </p>
              <Link 
                href={`/lecture/${firstCourse.id}`} 
                className="mt-auto px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Go to Lecture
              </Link>
            </div>
          )}

          {/* Quick Start: Quiz */}
          {firstQuiz && (
            <div className="clean-card p-6 flex flex-col items-start hover:-translate-y-1 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-slate-900">Test Your Knowledge</h2>
              <p className="text-slate-600 mb-6 text-sm flex-grow">
                Jump right into the first practice quiz: <span className="font-semibold text-slate-800">{firstQuiz.title}</span>.
              </p>
              <Link 
                href={`/quiz/${firstQuiz.id}`} 
                className="mt-auto px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Quiz
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}