'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Course } from '../../../lib/markdown';

import 'katex/dist/katex.min.css';

export default function CourseTabs({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState(courses[0]?.id || '');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeCourse = courses.find((course) => course.id === activeTab) || courses[0];
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(id);
      setIsTransitioning(false);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }, 150);
  };

  if (!courses.length) {
    return (
      <div className="glass-card p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
        No courses found. Add some .md files!
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '80ms' }}>

      {/* Sticky Header */}
      <div className="sticky top-0 z-10" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="px-5 sm:px-8 pt-5 pb-0">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2.5"
            style={{ color: 'var(--text-primary)' }}>
            <svg className="w-5 h-5" style={{ color: 'var(--text-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Study Materials
          </h2>

          {/* Pill Tabs */}
          <nav
            className="flex gap-1.5 overflow-x-auto pb-4 tab-scroll-container"
            style={{ scrollbarWidth: 'none' }}
            aria-label="Tabs"
          >
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleTabChange(course.id)}
                className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex-shrink-0"
                style={
                  activeTab === course.id
                    ? {
                        background: 'var(--accent-primary)',
                        color: '#fff',
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                      }
                    : {
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        border: 'none',
                      }
                }
                onMouseOver={(e) => {
                  if (activeTab !== course.id) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== course.id) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {course.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Markdown Content */}
      <div
        ref={contentRef}
        className="p-5 sm:p-8 md:p-12"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        <article className="prose-dark prose prose-sm sm:prose-base max-w-none
          prose-headings:font-bold
          prose-a:no-underline
          prose-table:border-collapse prose-table:w-full prose-table:text-sm sm:prose-table:text-base
          prose-th:p-3 prose-td:p-3
          prose-img:rounded-xl
          prose-pre:rounded-xl prose-pre:text-sm
          prose-blockquote:not-italic
        ">
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