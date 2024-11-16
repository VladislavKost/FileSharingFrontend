import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigator = useNavigate();
  const handleClickLogin = () => {
    navigator("/login");
  };
  const handleClickRegistration = () => {
    navigator("/registration");
  };

  return (
    <div>
      <h1>Main Page</h1>
      <Button onClick={handleClickLogin}>Login</Button>
      <Button onClick={handleClickRegistration}>Registration</Button>
    </div>
  );
};
