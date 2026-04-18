'use client';

export default function QuizButton() {
  return (
    <a
      href="/quiz"
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 active:scale-95"
      style={{
        background: 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.45)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      Take the Quiz
      <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    </a>
  );
}
