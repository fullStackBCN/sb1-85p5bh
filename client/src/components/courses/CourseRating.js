import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const CourseRating = ({ courseId }) => {
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/ratings`);
        setRatings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRatings();
  }, [courseId]);

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/courses/${courseId}/ratings`, { rating: userRating, review });
      setRatings([...ratings, res.data]);
      setUserRating(0);
      setReview('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Course Ratings and Reviews</h2>
      {user && (
        <form onSubmit={handleSubmitRating} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
              Your Rating
            </label>
            <select
              id="rating"
              value={userRating}
              onChange={(e) => setUserRating(Number(e.target.value))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="0">Select a rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
              Your Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Rating
          </button>
        </form>
      )}
      <div>
        {ratings.map((rating) => (
          <div key={rating.id} className="mb-4 p-4 border rounded">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-2">{'★'.repeat(rating.rating)}</span>
              <span className="text-gray-600">{rating.rating} out of 5</span>
            </div>
            <p className="text-gray-700">{rating.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRating;