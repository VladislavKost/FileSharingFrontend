import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { uploadFile } from "../../store/files/filesCreators";
import { Stack } from "@mui/material";

export const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

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
      dispatch(uploadFile(formData));
    }
  };
  return (
    <Stack direction={"column"} sx={{ margin: "50px" }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={onFileUpload} />
        <button>Upload</button>
      </form>
    </Stack>
  );
};
