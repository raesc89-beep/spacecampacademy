import { COURSE_DATA } from '@/lib/courseData';

export async function GET(request, { params }) {
  const { courseId } = await params;
  const courseModule = COURSE_DATA.find(c => c.id === courseId);

  if (!courseModule) {
    return Response.json({ error: 'Module not found' }, { status: 404 });
  }

  return Response.json(courseModule, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
