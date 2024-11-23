import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProfile, logoutUser } from "../../store/auth/authCreators";
import { useEffect } from "react";
import { EditProfileForm } from "../../components/EditProfileForm";

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
      <h1>ProfilePage</h1>
      {profileInfo && (
        <div>
          <h2>Profile info</h2>
          <EditProfileForm />
        </div>
      )}
      <Button onClick={onHandleLogout}>Logout</Button>
    </>
  );
};
