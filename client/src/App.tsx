import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "@routes/index.route";

const App: React.FC = () => {
  return (
    <div className="w-full min-h-full">
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
