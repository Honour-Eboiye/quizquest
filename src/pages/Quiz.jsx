import React, { useState, useEffect } from 'react';
import useFetch from '../../useFetch';
import { useParams, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const url = 'http://localhost:5000/questions';
  const { info, isPending, errors } = useFetch(url);
  const [userChoices, setUserChoices] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0); // Stopwatch to track elapsed time
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const handleChoice = (questionId, choice) => {
    setUserChoices((prevChoices) => ({
      ...prevChoices,
      [questionId]: choice,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getQuestionsForPage = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return info.slice(startIndex, endIndex);
  };

  const calculateScore = () => {
    let score = 0;
    info.forEach((question) => {
      if (userChoices[question.id] === question.answer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();

    // Prepare the data to be updated
    const resultData = {
      score,
      timeElapsed,
    };

    try {
      // Send a PUT request to update the user's score and time
      await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'PATCH', // Use PATCH to update specific fields
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });

      // Navigate to the result page after updating the data
      navigate(`/result/${userId}`, { state: { score, timeElapsed } });
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Quiz for User: {userId}</h1>
      {isPending && <p className="text-gray-700">Loading...</p>}
      {errors && <p className="text-red-600">{errors}</p>}
      {!isPending && info && (
        <>
          {/* Stopwatch */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700">
              Time Elapsed: <span className="text-blue-600">{formatTime(timeElapsed)}</span>
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-3xl bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{
                width: `${(Object.keys(userChoices).length / info.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Questions */}
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
            {getQuestionsForPage().map((question) => (
              <div key={question.id} className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">{question.question}</h2>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <button
                      key={`${question.id}-${option}`} // Use question.id and option value to ensure uniqueness
                      onClick={() => handleChoice(question.id, option)}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between w-full max-w-3xl mt-6">
            {currentPage > 1 && (
              <button
                onClick={handlePreviousPage}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Previous
              </button>
            )}
            {currentPage < Math.ceil(info.length / 10) && (
              <button
                onClick={handleNextPage}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Next
              </button>
            )}
            {currentPage === Math.ceil(info.length / 10) && (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;