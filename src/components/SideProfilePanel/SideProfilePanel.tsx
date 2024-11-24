import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { EditProfileForm } from "../EditProfileForm";
import { ChangePasswordForm } from "../ChangePasswordForm";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const SideProfilePanel = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Stack direction={"row"} spacing={2}>
        <Box sx={{ width: "20%", typography: "body1" }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Profile settings"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Profile information" {...a11yProps(0)} />
            <Tab label="Security" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={{ width: "80%", typography: "body1" }}>
          <TabPanel value={value} index={0}>
            <EditProfileForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ChangePasswordForm />
          </TabPanel>
        </Box>
      </Stack>
    </Box>
  );
};
