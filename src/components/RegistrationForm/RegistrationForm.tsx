import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import styles from "./RegistrationForm.module.css";
import { FormEvent, useState } from "react";
import { registerUser } from "../../store/auth/authCreators";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onHandleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    if (username && email && password && repeatPassword) {
      dispatch(registerUser({ username, password, email }));
    }
  };

  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  return (
    <>
      <h1>RegistrationForm</h1>
      <form
        autoComplete="off"
        className={styles.registration_form}
        onSubmit={onHandleRegister}
      >
        <Stack spacing={1}>
          <Input
            size="lg"
            type="text"
            placeholder="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            size="lg"
            type="text"
            placeholder="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            size="lg"
            type="password"
            placeholder="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            size="lg"
            type="password"
            placeholder="repeat password"
            variant="outlined"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button type="submit">Registration</Button>
        </Stack>
      </form>
      {isAuth && <Navigate to="/" />}
    </>
  );
};
