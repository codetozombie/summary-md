'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Course } from '../../../../lib/markdown';

import 'katex/dist/katex.min.css';

export default function LectureView({ course }: { course: Course }) {
  return (
    <div className="animate-fade-in-up">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-white/95 border-b border-slate-200"
        style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <div className="px-5 sm:px-8 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate leading-tight">{course.title}</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide hidden sm:block">Lecture Notes</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-12">
          <article className="prose-clean prose prose-base max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {course.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
