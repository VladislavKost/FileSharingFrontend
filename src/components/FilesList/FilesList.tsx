import { useAppSelector } from "../../hooks";
import { FileItem } from "../FileItem";

export const FilesList = () => {
  const files = useAppSelector((state) => state.files.files);
  return (
    <div>
      {files.map((file) => (
        <FileItem key={file.id} file={file} />
      ))}
    </div>
  );
};
