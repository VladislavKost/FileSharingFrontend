import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};
