import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProfile, logoutUser } from "../../store/auth/authCreators";
import { useEffect } from "react";

import Stack from "@mui/material/Stack";
import { SideProfilePanel } from "../../components/SideProfilePanel";

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
        <Stack direction={"row"} spacing={2}>
          <SideProfilePanel />
        </Stack>
      )}
      <Button onClick={onHandleLogout}>Logout</Button>
    </>
  );
};
