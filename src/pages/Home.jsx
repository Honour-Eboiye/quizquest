import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Quiz Quest!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Test your knowledge and challenge yourself with our exciting quizzes.
      </p>
      <button
        onClick={handleStartQuiz}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Take a Quiz
      </button>
    </div>
  );
};

export default Home;