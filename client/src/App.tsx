import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "@routes/index.route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingSpinner from "@components/spinners/LoadingSpinner";

const App: React.FC = () => {
  return (
    <div className="w-full min-h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes.map((route, key) => (
            <Route path={route.path} element={route.element} key={key} />
          ))}
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
  );
};

export default App;
