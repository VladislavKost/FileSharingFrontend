import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getAllFiles } from "../../store/files/filesCreators";
import { FilesList } from "../../components/FilesList";

export const AllFilesPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllFiles());
  }, []);

  return (
    <div>
      <h1>All files</h1>
      <FilesList all={true} />
    </div>
  );
};
