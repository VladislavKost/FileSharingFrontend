import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import { Navigation } from "../Navigation";

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ padding: "0" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Navigation />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
