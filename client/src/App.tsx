import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "@routes/index.route";
import { useAppContext } from "./context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const ctx = useAppContext();
  return (
    <div className="w-full min-h-full">
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {routes
            .filter((route) => {
              if (!route.auth) {
                return true;
              }

              if (route.auth === ctx.authStore.auth.isLoggedIn) {
                return true;
              }

              return false;
            })
            .map((route, key) => (
              <Route path={route.path} element={route.element} key={key} />
            ))}
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
  );
};

export default App;
