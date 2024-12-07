import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
  const emailVerifySuccess = useAppSelector(
    (state: RootState) => state.auth.verifyEmailData.success
  );

  return (
    <>
      {emailVerifySuccess && <p>Email verified successfully</p>}
      <h1>SingInForm</h1>
      <form className={styles.log_in_form} onSubmit={onHandleLogin}>
        <Stack spacing={1}>
          <TextField
            type="text"
            placeholder="email or username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
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
