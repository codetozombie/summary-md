'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  // Simple active check logic
  const isHome = pathname === '/';
  const isLectures = pathname.startsWith('/lecture');
  const isQuizzes = pathname.startsWith('/quiz');

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-3 sm:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <Link 
        href="/" 
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          isHome ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <svg className="w-6 h-6" fill={isHome ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
      </Link>

      <Link 
        href="/lectures" 
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          isLectures ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <svg className="w-6 h-6" fill={isLectures ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">Lectures</span>
      </Link>

      <Link 
        href="/quizzes" 
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          isQuizzes ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <svg className="w-6 h-6" fill={isQuizzes ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">Quizzes</span>
      </Link>
    </nav>
  );
}
