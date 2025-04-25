import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [successful, setSuccessful] = useState('');
  const [unsuccessful, setUnsuccessful] = useState('');

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://quizquest-plum.vercel.app/userInfo.json");
      const users = await response.json();

      const user = users.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (user) {
        setSuccessful('Login Successful!');
        navigate(`/quiz/${user.id}`);
      } else {
        setUnsuccessful('Invalid email or password!');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login to Quiz Quest
        </h1>
        {successful && (
          <p className="text-green-500 text-center mb-4">{successful}</p>
        )}
        {unsuccessful && (
          <p className="text-red-600 text-center mb-4">{unsuccessful}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleUserInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <small className="text-red-600">{errors.email}</small>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleUserInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <small className="text-red-600">{errors.password}</small>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
        >
          Login
        </button>
        <p className="text-center text-gray-700">
          Don't have an account?{" "}
          <span
            onClick={() => navigate('/sign-up')}
            className="text-blue-600 font-bold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;