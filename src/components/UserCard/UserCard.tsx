import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { IUser } from "../../store/users/usersSlice";
import { useAppDispatch } from "../../hooks";
import { changeAdminRight, deleteUser } from "../../store/users/usersCreators";
import { useNavigate } from "react-router-dom";

export const UserCard = ({ user }: { user: IUser }) => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const handleAddAdminRight = () => {
    dispatch(changeAdminRight(user.id, true));
  };
  const handleRemoveAdminRight = () => {
    dispatch(changeAdminRight(user.id, false));
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id));
  };
  const handleOpenUserFiles = () => {
    navigator(`/all-files/${user.id}`);
  };
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
      {!user.is_admin && (
        <button onClick={handleAddAdminRight}>Add admin rights</button>
      )}
      {user.is_admin && (
        <button onClick={handleRemoveAdminRight}>Remove admin right</button>
      )}
      <button onClick={handleDeleteUser}>Delete user</button>
      <button onClick={handleOpenUserFiles}>Look at user files</button>
    </Box>
  );
};
