import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getAllUsers } from "../../store/users/usersCreators";
import { UserCard } from "../../components/UserCard";

export const AllUsersPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const { users } = useAppSelector((state) => state.users);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        All Users
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          gap: "20px",
          justifyContent: "center",
          width: "800px",
          margin: "0 auto",
        }}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>
    </Box>
  );
};
