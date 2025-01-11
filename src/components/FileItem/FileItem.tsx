import Stack from "@mui/material/Stack";
import { IFile } from "../../store/files/filesSlice";
import { useAppDispatch } from "../../hooks";
import {
  deleteFile,
  downloadFile,
  getAllFiles,
  getMyFiles,
  updateFileInfo,
} from "../../store/files/filesCreators";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export const FileItem = ({
  file,
  type,
  setUpdateFiles,
}: {
  file: IFile;
  type: string;
  setUpdateFiles?: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [comment, setComment] = useState(file.comment);
  const [fileName, setFileName] = useState(file.file_name);
  const handleDelete = () => {
    dispatch(deleteFile(file.id));
  };

  const handleDownload = () => {
    dispatch(downloadFile(file.id));
    if (type === "my") {
      dispatch(getMyFiles());
    } else if (type === "all") {
      dispatch(getAllFiles());
    } else if (type === "user" && setUpdateFiles) {
      setUpdateFiles(true);
    }
  };

  useEffect(() => {
    if (editMode) {
      console.log("editMode", editMode);
    }
  }, [editMode]);

  const onSaveClick = () => {
    if (!fileName) {
      alert("File name is required");
    } else {
      setEditMode(false);
      const newData = {
        comment,
        file_name: fileName,
      };
      dispatch(updateFileInfo(file.id, newData));
    }
  };

  const handleShare = () => {
    const origin = window.location.origin.toString();
    const shareUrl = `${origin}/files/${file.id}`;
    navigator.clipboard.writeText(shareUrl);
  };

  const onCancelClick = () => {
    setEditMode(false);
    setComment(file.comment);
    setFileName(file.file_name);
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
      {!editMode && (
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
      )}
      {editMode && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <input
            type="text"
            value={fileName}
            placeholder="File name"
            onChange={(e) => setFileName(e.target.value)}
          />
        </Box>
      )}
      {type === "all" && file.owner && (
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
      <Box
        sx={{
          textAlign: "center",
          width: "200px",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        File size: {file.file_size}B
      </Box>
      <Box
        sx={{
          textAlign: "center",
          width: "200px",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        Uploaded: {new Date(file.uploaded_at).toLocaleString("ru-RU")}
      </Box>
      <Box
        sx={{
          textAlign: "center",
          width: "200px",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        Last downloaded:{" "}
        {new Date(file.last_downloaded).toLocaleString("ru-RU")}
      </Box>
      {file.comment && !editMode && (
        <Box
          sx={{
            textAlign: "center",
            width: "200px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          Comment: {file.comment}
        </Box>
      )}
      {editMode && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <input
            type="text"
            value={comment}
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
      )}
      {!editMode && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleShare}>Share</button>
          <button onClick={handleDelete}>Delete</button>
        </Box>
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}
        {editMode && <button onClick={onSaveClick}>Save</button>}
        {editMode && <button onClick={onCancelClick}>Cancel</button>}
      </Box>
    </Stack>
  );
};
