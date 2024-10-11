import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { IAppContext } from "@interfaces/context.interface";
import authStore from "@store/auth.store";

const AppContext = createContext<IAppContext>({
  authStore,
});

export const useAppContext = () => useContext(AppContext);

interface Props {
  children: ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("access_token")) {
      }
    };

    fetchData();
  }, []);
  return (
    <AppContext.Provider value={{ authStore }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
