import Stack from "@mui/material/Stack";
import { FileItem } from "../FileItem";
import { IFile } from "../../store/files/filesSlice";
import { IUser } from "../../store/users/usersSlice";

export const FilesList = ({
  files,
  type,
  user,
}: {
  files: IFile[];
  type: string;
  user?: IUser;
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {files.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          type={type}
          user={user || undefined}
        />
      ))}
    </Stack>
  );
};
