import { getCourses } from '../../lib/markdown';
import CourseTabs from './components/CourseTabs';

export default function Home() {
  const courses = getCourses();

  return (
    // Replaced flat gray with a subtle gradient and adjusted padding for mobile (p-4)
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8 md:p-12 selection:bg-blue-200 selection:text-blue-900">
      <div className="max-w-5xl mx-auto">
        <CourseTabs courses={courses} />
      </div>
    </main>
  );
}