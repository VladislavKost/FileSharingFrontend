import Stack from "@mui/material/Stack";
import { FileItem } from "../FileItem";
import { IFile } from "../../store/files/filesSlice";

export const FilesList = ({
  files,
  type,
  setUpdateFiles,
}: {
  files: IFile[];
  type: string;
  setUpdateFiles?: (value: boolean) => void;
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
          setUpdateFiles={setUpdateFiles}
        />
      ))}
    </Stack>
  );
};
