import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const DiscussionForum = ({ courseId }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/forum`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [courseId]);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/courses/${courseId}/forum`, { content: newPost });
      setPosts([...posts, res.data]);
      setNewPost('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Discussion Forum</h2>
      {user && (
        <form onSubmit={handleSubmitPost} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post">
              New Post
            </label>
            <textarea
              id="post"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Post
          </button>
        </form>
      )}
      <div>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded">
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted by {post.user_name} on {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;