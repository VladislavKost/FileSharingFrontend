import { useAppDispatch } from "../../hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { downloadFile } from "../../store/files/filesCreators";

export const DownloadFilePage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (params.id !== undefined) {
      try {
        dispatch(downloadFile(Number(params.id)));
        setError(true);
      } catch (error) {
        setError(true);
      }
    }
  }, [dispatch, params.id]);
  return (
    <div>
      {error ? (
        <span>Спасибо, что используете наш сервис!</span>
      ) : (
        <span> Произошла ошибка, попробуйте позже! </span>
      )}
    </div>
  );
};
