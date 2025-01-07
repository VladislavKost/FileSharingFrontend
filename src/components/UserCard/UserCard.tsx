import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { IUser } from "../../store/users/usersSlice";

export const UserCard = ({ user }: { user: IUser }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "10px",
      }}
    >
      <Box>
        <Avatar
          sx={{ width: 200, height: 200, margin: "10px" }}
          alt={user?.username || ""}
          src={user?.user_image || ""}
        />
      </Box>
      <Box>
        Name: {user.first_name} {user.last_name}
      </Box>
      <Box>Email: {user.email}</Box>
      <Box>Username: {user.username}</Box>
      <Box>Gender: {user.gender}</Box>
      <Box>Files amount: {user.files_amount}</Box>
      <Box>Files size: {user.files_size}B</Box>
      <Box>Is Admin: {String(user.is_admin)}</Box>
      {!user.is_admin && <button>Add admin rights</button>}
      {user.is_admin && <button>Remove admin right</button>}
      <button>Delete user</button>
      <button>Look at user files</button>
    </Box>
  );
};
