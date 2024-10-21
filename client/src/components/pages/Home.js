import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, AcademicCapIcon, CashIcon } from '@heroicons/react/outline';

const Home = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to Online Course Platform
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover, learn, and grow with our wide range of online courses.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Why choose us?</h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <BookOpenIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">High-Quality Content</h3>
              <p className="mt-2 text-base text-gray-500">
                Our courses are created by industry experts and constantly updated.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <AcademicCapIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Learn at Your Own Pace</h3>
              <p className="mt-2 text-base text-gray-500">
                Access course materials anytime, anywhere, and learn at your convenience.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <CashIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Affordable Pricing</h3>
              <p className="mt-2 text-base text-gray-500">
                Get access to premium courses at competitive prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;