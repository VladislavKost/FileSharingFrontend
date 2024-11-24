import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";

import { changeUserProfileInfo } from "../../store/auth/authCreators";
import MenuItem from "@mui/material/MenuItem";

interface IUserDataForm {
  email: { data: string; new: boolean };
  username: { data: string; new: boolean };
  first_name: { data: string; new: boolean };
  last_name: { data: string; new: boolean };
  gender: { data: string; new: boolean };
  user_image: { data: File | string | undefined; new: boolean };
}

export const EditProfileForm = () => {
  const [userDataForm, setUserDataForm] = useState<IUserDataForm>({
    email: { data: "", new: false },
    username: { data: "", new: false },
    first_name: { data: "", new: false },
    last_name: { data: "", new: false },
    gender: { data: "", new: false },
    user_image: { data: "", new: false },
  });

  const userData = useAppSelector((state) => state.auth.profileData.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = {
      email: { data: userData?.email ?? "", new: false },
      username: { data: userData?.username ?? "", new: false },
      first_name: { data: userData?.first_name ?? "", new: false },
      last_name: { data: userData?.last_name ?? "", new: false },
      gender: { data: userData?.gender ?? "", new: false },
      user_image: { data: userData?.user_image ?? "", new: false },
    };
    setUserDataForm(data);
  }, [userData]);

  const handleChangeProfileInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userDataForm);
    const formData = createFormData();
    dispatch(changeUserProfileInfo(formData));
  };

  const createFormData = () => {
    const formData = new FormData();
    Object.entries(userDataForm).forEach(([key, value]) => {
      if (value.new) {
        if (key === "user_image") {
          formData.append(key, value.data, value.data.name);
        } else {
          formData.append(key, value.data);
        }
      }
    });
    return formData;
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUserDataForm({ ...userDataForm, user_image: { data: file, new: true } });
  };

  return (
    <Box component="form" onSubmit={handleChangeProfileInfo} width={"100%"}>
      <Stack spacing={2} direction={"row"}>
        <Stack spacing={2}>
          <Box position="relative" display="inline-block">
            <Box>
              {userDataForm.user_image.data && (
                <img
                  style={{ width: "500px", height: "500px" }}
                  src={
                    typeof userDataForm.user_image.data === "string"
                      ? userDataForm.user_image.data
                      : URL.createObjectURL(userDataForm.user_image.data)
                  }
                  alt="avatar"
                />
              )}
            </Box>
            <Box
              position={"absolute"}
              top={250}
              left={250}
              sx={{ transform: "translate(-50)" }}
            >
              <IconButton
                // sx={{
                //   position: "absolute",
                //   top: "50",
                //   left: "50",
                //   transform: "translate(-50)",
                // }}
                component="label"
              >
                <input
                  hidden
                  type="file"
                  name="myImage"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleUploadImage}
                />
                <FlipCameraIosIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Username"
            type="text"
            value={userDataForm.username.data}
            aria-readonly
          />
          <TextField
            label="First name"
            type="text"
            value={userDataForm.first_name.data}
            onChange={(e) =>
              setUserDataForm({
                ...userDataForm,
                first_name: { data: e.target.value, new: true },
              })
            }
          />
          <TextField
            label="Last name"
            type="text"
            value={userDataForm.last_name.data}
            onChange={(e) =>
              setUserDataForm({
                ...userDataForm,
                last_name: { data: e.target.value, new: true },
              })
            }
          />
          <TextField
            type="text"
            label="Email"
            value={userDataForm.email.data}
            onChange={(e) =>
              setUserDataForm({
                ...userDataForm,
                email: { data: e.target.value, new: true },
              })
            }
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={userDataForm.gender.data}
              // label="Gender"
              input={<OutlinedInput id="gender-select" label="Gender" />}
              onChange={(e) =>
                setUserDataForm({
                  ...userDataForm,
                  gender: { data: e.target.value, new: true },
                })
              }
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Button type="submit">Save</Button>
    </Box>
  );
};
