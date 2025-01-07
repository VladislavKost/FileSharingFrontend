import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import filesReducer from "./files/filesSlice";
import usersReducer from "./users/usersSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    files: filesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV !== "production" ? [logger] : [])
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
