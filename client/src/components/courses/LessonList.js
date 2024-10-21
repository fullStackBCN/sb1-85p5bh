import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LessonList = ({ courseId }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/lessons`);
        setLessons(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loading) {
    return <div>Loading lessons...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Course Content</h2>
      <ul className="divide-y divide-gray-200">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="py-4">
            <Link to={`/courses/${courseId}/lessons/${lesson.id}`} className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                {lesson.video_url && <p className="text-sm text-gray-500">Video Lesson</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;