'use client';

export default function BackLink() {
  return (
    <a
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors duration-200"
      style={{ color: 'var(--text-tertiary)' }}
      onMouseOver={(e) => {
        e.currentTarget.style.color = 'var(--text-accent)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = 'var(--text-tertiary)';
      }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      Back to Study Materials
    </a>
  );
}
