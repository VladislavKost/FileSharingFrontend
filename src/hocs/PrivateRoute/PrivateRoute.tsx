import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

interface Props {
  adminPage: boolean;
}

export const ProtectedRoute: FC<PropsWithChildren<Props>> = ({
  children,
  adminPage,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
  const isAdmin = useAppSelector(
    (state: RootState) => state.auth.profileData.profile?.is_admin
  );
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }
  if (adminPage && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};
