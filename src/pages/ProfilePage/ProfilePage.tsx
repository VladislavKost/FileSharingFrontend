import { Button } from "@mui/joy";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProfile, logoutUser } from "../../store/auth/authCreators";
import { useEffect } from "react";
import { Navigation } from "../../components/Navigation";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const onHandleLogout = () => {
    dispatch(logoutUser());
  };
  const profileInfo = useAppSelector((state) => state.auth.profileData.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <Navigation />
      <h1>ProfilePage</h1>
      {profileInfo && (
        <div>
          <h2>Profile info</h2>
          <p>Username: {profileInfo.username}</p>
          <p>Email: {profileInfo.email}</p>
        </div>
      )}
      <Button onClick={onHandleLogout}>Logout</Button>
    </>
  );
};
