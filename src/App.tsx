import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProtectedRoute } from "./hocs/PrivateRoute";
import { ProfilePage } from "./pages/ProfilePage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { logoutUser, verifyAccessToken } from "./store/auth/authCreators";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Layout } from "./components/Layout";
import { RegistrationEmailVerifyPage } from "./components/RegistrationEmailVerifyPage";

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state) => state.auth.authData.accessToken
  );
  console.log(accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(verifyAccessToken({ token: accessToken }));
    } else {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
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
