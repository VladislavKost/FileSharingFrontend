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
import { useAppDispatch } from "./hooks";
import { getProfile } from "./store/auth/authCreators";
import { RegistrationPage } from "./pages/RegistrationPage";

function App() {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
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
        {/* <Route path="/" element={<Navigate to="/posts" replace />} /> */}
        {/* <Route path="/posts" element={<Main />} loader={postsLoader} />
        <Route path="/posts/:id" element={<Post />} loader={postLoader} />
        <Route path="/posts/new" element={<NewPost />} /> */}
      </>
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
