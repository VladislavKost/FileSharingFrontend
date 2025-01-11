import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./RegistrationForm.module.css";
import { FormEvent, useState } from "react";
import { registerUser } from "../../store/auth/authCreators";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import {
  IRegistrationFormErrors,
  registrationFailure,
} from "../../store/auth/authSlice";
import { Typography } from "@mui/material";

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
    } else {
      const fields = { username, email, password1, password2 };
      const emptyFields = Object.entries(fields).filter(
        ([_key, value]) => !value
      );
      const emptyFieldsErrorsObject: {
        username?: string;
        email?: string;
        password1?: string;
        password2?: string;
      } = {};
      for (const [key] of emptyFields) {
        emptyFieldsErrorsObject[key as keyof typeof emptyFieldsErrorsObject] =
          "Field should be filled in!";
      }
      dispatch(
        registrationFailure(emptyFieldsErrorsObject as IRegistrationFormErrors)
      );
    }
  };
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
  const isRegistrationSuccess = registrationData.success;

  return (
    <>
      {!isRegistrationSuccess && <h1>RegistrationForm</h1>}
      {isRegistrationSuccess ? (
        <div>
          <h2>Registration success</h2>
          <p>
            Registration success. The confirmation email is send to your email
            address.
          </p>
        </div>
      ) : (
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
            <Typography
              sx={{
                color: "#d32f2f",
                fontSize: "0.75rem",
                marginLeft: "14px",
                marginTop: "3px",
              }}
            >
              {registrationData.error?.non_field_errors}
            </Typography>
            <Button type="submit">Registration</Button>
          </Stack>
        </form>
      )}
      {isAuth && <Navigate to="/" />}
    </>
  );
};
