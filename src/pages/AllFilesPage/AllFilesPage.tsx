import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFiles } from "../../store/files/filesCreators";
import { FilesList } from "../../components/FilesList";

export const AllFilesPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllFiles());
  }, []);
  const files = useAppSelector((state) => state.files.allFiles);
  return (
    <div>
      <h1>All files</h1>
      <FilesList files={files} type="all" />
    </div>
  );
};
