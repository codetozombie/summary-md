'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Course } from '../../../lib/markdown';

// IMPORTANT: This CSS makes the math symbols render beautifully!
import 'katex/dist/katex.min.css';

export default function CourseTabs({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState(courses[0]?.id || '');
  const activeCourse = courses.find((course) => course.id === activeTab) || courses[0];

  if (!courses.length) return <div className="p-8 text-center text-gray-500">No courses found. Add some .md files!</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden transition-all">
      
      {/* STICKY HEADER: Stays at the top when scrolling, with a frosted glass effect */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="px-4 sm:px-8 pt-6 pb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 tracking-tight">
            Course Materials
          </h1>
          
          {/* TABS: Scrollable horizontally on mobile, invisible scrollbar, touch-friendly pills */}
          <nav 
            className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: 'none' }} // Hides scrollbar in Firefox
            aria-label="Tabs"
          >
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveTab(course.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium transition-all duration-200 ease-in-out active:scale-95 ${
                  activeTab === course.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {course.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* MARKDOWN CONTENT: Responsive padding and typography scaling */}
      {/* MARKDOWN CONTENT: Responsive padding and typography scaling */}
        <div className="p-5 sm:p-8 md:p-12">
          <article className="prose prose-slate max-w-none prose-sm sm:prose-base prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-800 prose-a:text-blue-600 prose-a:decoration-blue-300 hover:prose-a:decoration-blue-600 hover:prose-a:underline-offset-4 prose-table:border-collapse prose-table:w-full prose-table:text-sm sm:prose-table:text-base prose-th:bg-slate-50 prose-th:p-3 prose-th:border prose-th:border-slate-200 prose-th:text-slate-700 prose-td:p-3 prose-td:border prose-td:border-slate-200 prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkMath]} 
              rehypePlugins={[rehypeKatex]}
            >
              {activeCourse.content}
            </ReactMarkdown>
          </article>
        </div>
    </div>
  );
}