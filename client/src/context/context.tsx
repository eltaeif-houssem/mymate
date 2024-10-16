import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { IAppContext } from "@interfaces/context.interface";
import authStore from "@store/auth.store";
import authService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import * as routePaths from "@constants/route-urls.constant";

const AppContext = createContext<IAppContext>({
  authStore,
});

export const useAppContext = () => useContext(AppContext);

interface Props {
  children: ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      if (access_token && refresh_token) {
        const response = await authService.verifyToken(
          access_token,
          refresh_token
        );

        if (!response.error) {
          authStore.authenticate(response);
          navigate(routePaths.HOME);
        }
      } else {
        navigate(routePaths.AUTH_SIGNIN);
      }
    };

    fetchData();
  }, []);
  return (
    <AppContext.Provider value={{ authStore }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
