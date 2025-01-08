import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProtectedRoute } from "./hocs/PrivateRoute";
import { ProfilePage } from "./pages/ProfilePage";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getAccessToken } from "./store/auth/authCreators";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Layout } from "./components/Layout";
import { RegistrationEmailVerifyPage } from "./components/RegistrationEmailVerifyPage";
import { AllFilesPage } from "./pages/AllFilesPage";
import { DownloadFilePage } from "./pages/DownloadFilePage";
import { AllUsersPage } from "./pages/AllUsersPage";
import { UserFilesPage } from "./pages/UserFilesPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccessToken());
  }, [dispatch]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={<Navigate replace to="/my-files"></Navigate>}
        />
        <Route
          path="/my-files"
          element={
            <ProtectedRoute adminPage={false}>
              <MainPage />
            </ProtectedRoute>
          }
        />

        <Route path="/files/:id" element={<DownloadFilePage />} />
        <Route
          path="/all-files"
          element={
            <ProtectedRoute adminPage={true}>
              <AllFilesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-files/:id"
          element={
            <ProtectedRoute adminPage={false}>
              <UserFilesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            <ProtectedRoute adminPage={false}>
              <AllUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute adminPage={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/registration/account-email-verify/:key"
          element={<RegistrationEmailVerifyPage />}
        />
      </Route>
    ),
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}
export default App;
