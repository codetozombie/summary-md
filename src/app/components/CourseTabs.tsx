'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Course } from '../../../lib/markdown';

export default function CourseTabs({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState(courses[0]?.id || '');
  const activeCourse = courses.find((course) => course.id === activeTab) || courses[0];

  if (!courses.length) return <div>No courses found.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header & Tabs */}
      <div className="border-b border-gray-200 bg-gray-100/50 px-6 pt-6">
        <h1 className="text-2xl font-bold mb-6">Course Materials</h1>
        
        <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setActiveTab(course.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === course.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {course.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Markdown Content Area */}
      <div className="p-6 sm:p-10">
        <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-table:border-collapse prose-th:bg-gray-100 prose-th:p-2 prose-td:p-2 prose-td:border-b">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {activeCourse.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}