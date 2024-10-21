import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          if (user.role === 'student') {
            const res = await axios.get('/api/users/enrolled-courses');
            setEnrolledCourses(res.data);
          } else if (user.role === 'instructor') {
            const res = await axios.get('/api/users/created-courses');
            setCreatedCourses(res.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {user && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">User Information</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.role}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {user && user.role === 'student' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrolled Courses</h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5"><div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{course.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                    <div className="mt-4">
                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You are not enrolled in any courses yet.</p>
          )}
        </div>
      )}

      {user && user.role === 'instructor' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Courses</h2>
          {createdCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {createdCourses.map((course) => (
                <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{course.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                    <div className="mt-4">
                      <Link
                        to={`/courses/${course.id}/edit`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Edit Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't created any courses yet.</p>
          )}
          <div className="mt-6">
            <Link
              to="/courses/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Create New Course
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;