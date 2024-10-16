import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "@routes/index.route";
import { useAppContext } from "./context/context";

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
            .map((route) => (
              <Route path={route.path} element={route.element} />
            ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
