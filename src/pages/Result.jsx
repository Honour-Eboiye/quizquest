import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Result = () => {
  const { userId } = useParams(); // Get userId from the route parameters
  const location = useLocation();
  const navigate = useNavigate();
  const { score, timeElapsed } = location.state || { score: 0, timeElapsed: 0 };

  const [username, setUsername] = useState('User'); // Default username
  const totalScore = 100; // Replace with the actual total score if dynamic
  const passingScore = totalScore * 0.7; // 70% of the total score

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    // Fetch the user data from userInfo.json
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://quizquest-plum.vercel.app/userInfo.json/${userId}`);
        const user = await response.json();
        if (user && user.username) {
          setUsername(user.username); // Set the username from the fetched data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Quiz Result</h1>
        <p className="text-lg text-gray-700 mb-6">
          Congratulations, <span className="font-bold">{username}</span>!
        </p>
        <div className="mb-4">
          <h2 className="text-xl font-medium text-gray-800">Your Score:</h2>
          <p className="text-2xl font-bold text-green-600">{score}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800">Time Elapsed:</h2>
          <p className="text-2xl font-bold text-blue-600">{formatTime(timeElapsed)}</p>
        </div>
        <div className="mb-6">
          {score >= passingScore ? (
            <p className="text-lg font-bold text-green-600">You Passed! 🎉</p>
          ) : (
            <p className="text-lg font-bold text-red-600">You Failed. 😢</p>
          )}
        </div>
        <button
          onClick={() => navigate('/leaderboard')}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
        >
          View Leaderboard
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Result;