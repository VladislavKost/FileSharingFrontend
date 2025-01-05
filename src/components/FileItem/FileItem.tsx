import Stack from "@mui/material/Stack";
import { IFile } from "../../store/files/filesSlice";
import { useAppDispatch } from "../../hooks";
import { deleteFile, downloadFile } from "../../store/files/filesCreators";

export const FileItem = ({ file }: { file: IFile }) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteFile(file.id));
  };

  const handleDownload = () => {
    dispatch(downloadFile(file.id, file.file_name));
  };
  return (
    <Stack direction="row" spacing={2}>
      <div key={file.id}>{file.file_name}</div>
      <button onClick={handleDownload}>Download</button>
      <button onClick={handleDelete}>Delete</button>
    </Stack>
  );
};
