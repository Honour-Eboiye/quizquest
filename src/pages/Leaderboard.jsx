import React from 'react';
import useFetch from '../../useFetch';

const Leaderboard = () => {
  const { info, isPending, errors } = useFetch("http://localhost:5000/user");

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Leaderboard</h1>
      {isPending && <p className="text-gray-700">Loading...</p>}
      {errors && <p className="text-red-600">{errors}</p>}
      {!isPending && info && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Rank</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Score</th>
                <th className="border px-4 py-2 text-left">Time Spent</th>
              </tr>
            </thead>
            <tbody>
              {info
                .sort((a, b) => {
                  // Sort by score descending, then by time ascending
                  if (b.score === a.score) {
                    return a.timeSpent - b.timeSpent; // Faster time gets higher rank
                  }
                  return b.score - a.score; // Higher score gets higher rank
                })
                .map((data, index) => (
                  <tr key={data.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{data.email}</td>
                    <td className="border px-4 py-2">{data.score}</td>
                    <td className="border px-4 py-2">{data.timeSpent ? `${data.timeSpent}s` : 'N/A'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;