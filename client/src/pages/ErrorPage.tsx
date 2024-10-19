import React from "react";
import { Link } from "react-router-dom";
import * as routePaths from "@constants/route-urls.constant";

const ErrorPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <p className="text-2xl md:text-3xl font-light mb-4">
        Oops! Page not found.
      </p>
      <p className="text-center mb-8">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to={routePaths.HOME}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Go Home
      </Link>
      <img
        className="mt-8 w-64 md:w-96"
        src="https://i.imgur.com/qIufhof.png"
        alt="Error"
      />
    </div>
  );
};

export default ErrorPage;
