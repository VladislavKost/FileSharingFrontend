import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const registrationData = useAppSelector(
    (state) => state.auth.registrationData
  );

  const onHandleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (username && email && password1 && password2) {
      dispatch(registerUser({ username, password1, password2, email }));
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
          <TextField
            type="text"
            placeholder="username"
            variant="outlined"
            value={username}
            error={!!registrationData.error?.username}
            helperText={registrationData.error?.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="email"
            variant="outlined"
            value={email}
            error={!!registrationData.error?.email}
            helperText={registrationData.error?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="password"
            variant="outlined"
            value={password1}
            error={!!registrationData.error?.password1}
            helperText={registrationData.error?.password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="repeat password"
            variant="outlined"
            value={password2}
            error={!!registrationData.error?.password2}
            helperText={registrationData.error?.password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div>{registrationData.error?.non_field_errors !== undefined}</div>
          <Button type="submit">Registration</Button>
        </Stack>
      </form>
      {isAuth && <Navigate to="/" />}
    </>
  );
};
