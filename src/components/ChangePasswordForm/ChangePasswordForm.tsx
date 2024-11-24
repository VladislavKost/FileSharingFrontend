import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { changeUserPassword } from "../../store/auth/authCreators";
import { useAppDispatch } from "../../hooks";

interface IPasswordForm {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

interface IPasswordShow {
  current_password: boolean;
  new_password: boolean;
  new_password_confirm: boolean;
}

export const ChangePasswordForm = () => {
  const [passwordForm, setPasswordForm] = useState<IPasswordForm>({
    current_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState<IPasswordShow>({
    current_password: false,
    new_password: false,
    new_password_confirm: false,
  });

  const dispatch = useAppDispatch();

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordForm.new_password === passwordForm.new_password_confirm) {
      const formData = createFormData();
      dispatch(changeUserPassword(formData));
    } else {
      console.log("Passwords do not match");
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("current_password", passwordForm.current_password);
    formData.append("new_password", passwordForm.new_password);
    return formData;
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const eventTarget = event.currentTarget.id as keyof IPasswordShow;
    setShowPassword({ ...showPassword, [eventTarget]: true });
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const eventTarget = event.currentTarget.id as keyof IPasswordShow;
    setShowPassword({ ...showPassword, [eventTarget]: false });
  };

  return (
    <Box component="form" sx={{ width: "50%" }} onSubmit={handleChangePassword}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <FormControl sx={{ m: 1, width: "50%" }} variant="outlined">
          <InputLabel htmlFor="current-password">Current password</InputLabel>
          <OutlinedInput
            id="current-password"
            type={showPassword.current_password ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  id="current_password"
                  aria-label={
                    showPassword.current_password
                      ? "hide the password"
                      : "display the password"
                  }
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword.current_password ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Current password"
            value={passwordForm.current_password}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                current_password: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "50%" }} variant="outlined">
          <InputLabel htmlFor="new-password">New password</InputLabel>
          <OutlinedInput
            id="new-password"
            type={showPassword.new_password ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  id="new_password"
                  aria-label={
                    showPassword.new_password
                      ? "hide the password"
                      : "display the password"
                  }
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword.new_password ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="New password"
            value={passwordForm.new_password}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                new_password: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "50%" }} variant="outlined">
          <InputLabel htmlFor="confirm-new-password">
            Confirm new password
          </InputLabel>
          <OutlinedInput
            id="confirm-new-password"
            type={showPassword.new_password_confirm ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  id="new_password_confirm"
                  aria-label={
                    showPassword.new_password_confirm
                      ? "hide the password"
                      : "display the password"
                  }
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword.new_password_confirm ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm new password"
            value={passwordForm.new_password_confirm}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                new_password_confirm: e.target.value,
              })
            }
          />
        </FormControl>

        <Button sx={{ width: "50%" }} variant="contained" type="submit">
          Change password
        </Button>
      </Stack>
    </Box>
  );
};
