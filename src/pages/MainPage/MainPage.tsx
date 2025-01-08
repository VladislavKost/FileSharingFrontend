import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getMyFiles } from "../../store/files/filesCreators";
import { FilesList } from "../../components/FilesList";
import { FileUploadForm } from "../../components/FileUploadForm";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyFiles());
  }, [dispatch]);
  const files = useAppSelector((state) => state.files.files);
  return (
    <div>
      <h1>My files</h1>
      <FilesList files={files} type="my" />
      <FileUploadForm />
    </div>
  );
};
