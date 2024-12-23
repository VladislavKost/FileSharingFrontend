import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getMyFiles } from "../../store/files/filesCreators";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyFiles());
  }, []);

  const files = useAppSelector((state) => state.files.files);
  return (
    <div>
      <h1>Main Page</h1>
      {files.map((file) => (
        <div key={file.id}>{file.file_name}</div>
      ))}
    </div>
  );
};
