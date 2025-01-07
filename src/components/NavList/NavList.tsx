import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

export const NavList = ({ ...props }) => {
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
  const isAdmin = useAppSelector(
    (state: RootState) => state.auth.profileData.profile?.is_admin
  );

  const pages = [
    {
      name: "My files",
      id: "my-files",
      href: "/my-files",
      secure: true,
      admin: false,
    },
    {
      name: "All files",
      id: "all-files",
      href: "/all-files",
      secure: true,
      admin: true,
    },
    {
      name: "All users",
      id: "all-users",
      href: "/all-users",
      secure: true,
      admin: true,
    },
    { name: "Profile", id: "profile", href: "/profile", secure: true },
  ];

  return (
    <Stack
      overflow="auto"
      direction={{ xs: "column", sm: "row" }}
      gap={3}
      width={{ xs: "100%", sm: "initial" }}
      textAlign={{ xs: "center", sm: "initial" }}
      fontSize={{ xs: "22px", sm: "initial" }}
      {...props}
    >
      {pages.map((page) => {
        if (page.secure && !isAuth) {
          return null;
        }
        if (page.admin && !isAdmin) {
          return null;
        }
        return (
          <Link
            component={NavLink}
            key={page.id}
            sx={{
              color: { xs: "primary", sm: "white" },
            }}
            to={page.href}
          >
            {page.name}
          </Link>
        );
      })}
    </Stack>
  );
};
