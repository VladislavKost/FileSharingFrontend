import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";

export const RegistrationEmailVerifyPage = () => {
  const { key } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  debugger;
  return <> </>;
};
