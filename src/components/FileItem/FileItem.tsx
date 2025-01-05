import Stack from "@mui/material/Stack";
import { IFile } from "../../store/files/filesSlice";
import { useAppDispatch } from "../../hooks";
import { deleteFile, downloadFile } from "../../store/files/filesCreators";
import Box from "@mui/material/Box";

export const FileItem = ({
  file,
  all = false,
}: {
  file: IFile;
  all: boolean;
}) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteFile(file.id));
  };

  const handleDownload = () => {
    dispatch(downloadFile(file.id, file.file_name));
  };
  return (
    <Stack
      direction="column"
      spacing={1}
      useFlexGap
      border={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "200px",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          fontWeight: "bold",
        }}
      >
        {file.file_name}
      </Box>
      {all && file.owner && (
        <Box
          sx={{
            textAlign: "center",
            width: "200px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          Author: {file.owner.first_name} {file.owner.last_name}
        </Box>
      )}
      {file.comment && (
        <Box
          sx={{
            textAlign: "center",
            width: "200px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          Комментарий: {file.comment}
        </Box>
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleDelete}>Share</button>
        <button onClick={handleDelete}>Delete</button>
      </Box>
    </Stack>
  );
};
