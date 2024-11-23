import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
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
    <form onSubmit={handleChangeProfileInfo}>
      <Stack spacing={1}>
        <TextField type="text" value={userDataForm.username.data} disabled />
        <TextField
          type="text"
          value={userDataForm.email.data}
          onChange={(e) =>
            setUserDataForm({
              ...userDataForm,
              email: { data: e.target.value, new: true },
            })
          }
        />
        <TextField
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
          type="text"
          value={userDataForm.last_name.data}
          onChange={(e) =>
            setUserDataForm({
              ...userDataForm,
              last_name: { data: e.target.value, new: true },
            })
          }
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userDataForm.gender.data}
          label="Gender"
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
        {userDataForm.user_image.data && (
          <img
            style={{ width: "500px" }}
            src={
              typeof userDataForm.user_image.data === "string"
                ? userDataForm.user_image.data
                : URL.createObjectURL(userDataForm.user_image.data)
            }
            alt="avatar"
          />
        )}
        <input
          type="file"
          name="myImage"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleUploadImage}
        />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};
