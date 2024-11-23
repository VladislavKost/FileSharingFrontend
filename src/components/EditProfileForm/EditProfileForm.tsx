import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { changeUserProfileInfo } from "../../store/auth/authCreators";
import MenuItem from "@mui/material/MenuItem";

export const EditProfileForm = () => {
  const [userDataForm, setUserDataForm] = useState({
    id: null,
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    gender: "",
    user_image: "",
  });

  const userData = useAppSelector((state) => state.auth.profileData.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = {
      id: userData?.id ?? null,
      email: userData?.email ?? "",
      username: userData?.username ?? "",
      first_name: userData?.first_name ?? "",
      last_name: userData?.last_name ?? "",
      gender: userData?.gender ?? "",
      user_image: userData?.user_image ?? "",
    };
    setUserDataForm(
      data as {
        id: null;
        email: string;
        username: string;
        first_name: string;
        last_name: string;
        gender: string;
        user_image: string;
      }
    );
  }, [userData]);

  const handleChangeProfileInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userDataForm);
    dispatch(
      changeUserProfileInfo({
        ...userDataForm,
      })
    );
  };
  const handleChangeGender = (e: SelectChangeEvent) => {
    setUserDataForm({ ...userDataForm, gender: e.target.value });
    console.log(userDataForm);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserDataForm({
          ...userDataForm,
          user_image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleChangeProfileInfo}>
      <Stack spacing={1}>
        <TextField type="text" value={userDataForm.id} disabled />
        <TextField type="text" value={userDataForm.username} disabled />
        <TextField
          type="text"
          value={userDataForm.email}
          onChange={(e) =>
            setUserDataForm({ ...userDataForm, email: e.target.value })
          }
        />
        <TextField
          type="text"
          value={userDataForm.first_name}
          onChange={(e) =>
            setUserDataForm({ ...userDataForm, first_name: e.target.value })
          }
        />
        <TextField
          type="text"
          value={userDataForm.last_name}
          onChange={(e) =>
            setUserDataForm({ ...userDataForm, last_name: e.target.value })
          }
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userDataForm.gender}
          label="Age"
          onChange={handleChangeGender}
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
        {userDataForm.user_image && (
          <img src={userDataForm.user_image} alt="avatar" />
        )}
        <input
          type="file"
          name="myImage"
          onChange={handleUploadImage}
          // Event handler to capture file selection and update the state
        />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};
