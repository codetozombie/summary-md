import { getCourses } from '../../../../lib/markdown';
import LectureView from './LectureView';

export default async function LecturePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const courses = getCourses();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return <div className="p-8 text-slate-500">Lecture not found.</div>;
  }

  return (
    <main className="p-4 sm:p-8 md:p-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <LectureView course={course} />
      </div>
    </main>
  );
}
