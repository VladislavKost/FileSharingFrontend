import { useRef, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { uploadFile } from "../../store/files/filesCreators";
import { Box, Stack } from "@mui/material";

export const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("comment", comment);
      dispatch(uploadFile(formData));
      setFile(null);
      setComment("");
      if (ref.current) {
        ref.current.value = "";
      }
    }
  };
  return (
    <Stack direction={"column"} sx={{ margin: "50px" }}>
      <h2>Add new file</h2>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: "10px",
          }}
        >
          <input type="file" onChange={onFileUpload} ref={ref} />
          <input
            placeholder="Comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>Upload</button>
        </Box>
      </form>
    </Stack>
  );
};
