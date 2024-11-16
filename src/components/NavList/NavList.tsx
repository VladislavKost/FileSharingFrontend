import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

export const NavList = ({ ...props }) => {
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  const pages = [
    { name: "Home", id: "home", href: "/", secure: false },
    { name: "Exercises", id: "exercises", href: "/", secure: false },
    { name: "Learn works", id: "learn_words", href: "/", secure: false },
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
