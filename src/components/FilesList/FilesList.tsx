import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../hooks";
import { FileItem } from "../FileItem";

export const FilesList = ({ all = false }) => {
  let files;
  if (all) {
    files = useAppSelector((state) => state.files.allFiles);
  } else {
    files = useAppSelector((state) => state.files.files);
  }
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
        <FileItem key={file.id} file={file} all={all} />
      ))}
    </Stack>
  );
};
