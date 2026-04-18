'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Course } from '../../../../lib/markdown';

import 'katex/dist/katex.min.css';

export default function LectureView({ course }: { course: Course }) {
  return (
    <div className="clean-card overflow-hidden animate-fade-in-up">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 py-5">
          <h1 className="text-xl font-bold flex items-center gap-3 text-slate-900">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            {course.title}
          </h1>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="p-6 sm:p-10 md:p-14">
        <article className="prose-clean prose prose-sm sm:prose-base max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {course.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
