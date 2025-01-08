import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { getUserFiles } from "../../store/files/filesCreators";
import { getUserInfo } from "../../store/users/usersCreators";
import { FilesList } from "../../components/FilesList";
import { useParams } from "react-router";
import { IFile } from "../../store/files/filesSlice";
import { IUser } from "../../store/users/usersSlice";

export const UserFilesPage = () => {
  const [userFiles, setUserFiles] = useState<IFile[]>([]);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = Number(params.id);
  useEffect(() => {
    dispatch(getUserInfo(id)).then((user) => {
      if (user) {
        setUser(user);
      }
    });
    dispatch(getUserFiles(id)).then((files) => {
      if (files) {
        setUserFiles(files);
      }
    });
  }, [dispatch, id]);
  return (
    <div>
      <h1>
        {user?.first_name} {user?.last_name} files
      </h1>
      <h1>Files amount: {user?.files_amount}</h1>
      <FilesList files={userFiles} type="user" user={user} />
    </div>
  );
};
