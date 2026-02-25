import { getCourses } from '../../lib/markdown';
import CourseTabs from './components/CourseTabs';

export default function Home() {
  // This runs on the server during build/request time
  const courses = getCourses();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8 sm:p-12">
      <CourseTabs courses={courses} />
    </main>
  );
}