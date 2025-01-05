import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getMyFiles } from "../../store/files/filesCreators";
import { FilesList } from "../../components/FilesList";
import { FileUploadForm } from "../../components/FileUploadForm";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyFiles());
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      <FilesList />
      <FileUploadForm />
    </div>
  );
};
