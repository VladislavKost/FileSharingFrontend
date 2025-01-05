const Endpoints = {
  AUTH: {
    LOGIN: "/users/login/", // POST
    LOGOUT: "/users/logout/", // POST
    CHANGE_RESET: "/users/password/reset/", // POST
    CHANGE_RESET_CONFIRM: "/users/password/reset/confirm", // POST
    CHANGE_PASSWORD: "/users/password/change/", // POST
    PROFILE: "/users/profile/", // GET, PUT, PATCH
    TOKEN_VERIFY: "/users/token/verify/", // POST
    TOKEN_REFRESH: "/users/token/refresh/", // POST
    REGISTRATION: "/users/registration/", // POST
    REGISTRATION_EMAIL_VERIFICATION: "/users/registration/verify-email/", // POST
    REGISTRATION_RESEND_EMAIL_VERIFICATION: "/users/registration/resend-email/", // POST

    MY_FILES: "/files/", // POST, GET, DELETE
    ALL_FILES: "/files/all", // POST, GET, DELETE
  },
};
export default Endpoints;
