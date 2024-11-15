import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import styles from "./SignInForm.module.css";
import { FormEvent, useState } from "react";
import { loginUser } from "../../store/auth/authCreators";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

export const SingInForm = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  return (
    <>
      <h1>SingInForm</h1>
      <form className={styles.log_in_form} onSubmit={onHandleLogin}>
        <Stack spacing={1}>
          <Input
            size="lg"
            type="text"
            placeholder="email or username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            size="lg"
            type="password"
            placeholder="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
      {isAuth && <Navigate to="/" />}
    </>
  );
};
