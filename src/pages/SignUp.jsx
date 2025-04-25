import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordtwo: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordtwo: "",
  });

  const [alert, setAlert] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [isValid, setIsValid] = useState(false); // Track form validity

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) {
          error = "Username is required.";
        } else if (value.length < 3) {
          error = "Username must be at least 3 characters.";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = "Email is required.";
        } else if (!emailRegex.test(value)) {
          error = "Invalid email format.";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;

      case "passwordtwo":
        if (!value) {
          error = "Please confirm your password.";
        } else if (value !== data.password) {
          error = "Passwords do not match.";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, [name]: error };
      setIsValid(Object.values(updatedErrors).every((err) => err === ""));
      return updatedErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    let formIsValid = true;
    const updatedErrors = { ...errors };

    Object.keys(data).forEach((key) => {
      validateField(key, data[key]);
      if (updatedErrors[key]) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      console.log("Form has errors:", updatedErrors);
      return; // Prevent submission if there are errors
    }

    try {
      const response = await fetch("https://quizquest-plum.vercel.app/userInfo.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        setAlert(true);
        setData({
          username: "",
          email: "",
          password: "",
          passwordtwo: "",
        });
        setTimeout(() => setAlert(false), 3000);
        navigate("/login");
      } else {
        setUnsuccessful(true);
        setTimeout(() => {
          setUnsuccessful(false);
        }, 3000);
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
        {alert && (
          <h1 className="text-green-500 text-center mb-4">Signup Successful!!</h1>
        )}
        {unsuccessful && (
          <h1 className="text-red-600 text-center mb-4">Failed to save user!</h1>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={data.username}
            onChange={handleUserInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <small className="text-red-600">{errors.username}</small>
          )}
        </div>
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
        <div className="mb-4">
          <label
            htmlFor="passwordtwo"
            className="block text-gray-700 font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordtwo"
            id="passwordtwo"
            value={data.passwordtwo}
            onChange={handleUserInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.passwordtwo && (
            <small className="text-red-600">{errors.passwordtwo}</small>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid} // Disable button if form is invalid
          className={`w-full py-2 px-4 rounded-lg transition duration-200 ${
            isValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;