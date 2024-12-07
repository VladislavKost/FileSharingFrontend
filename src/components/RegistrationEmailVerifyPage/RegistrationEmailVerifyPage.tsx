import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { verifyEmail } from "../../store/auth/authCreators";
import { useEffect } from "react";

export const RegistrationEmailVerifyPage = () => {
  const { key } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailVerificationData = useAppSelector(
    (state) => state.auth.verifyEmailData
  );

  useEffect(() => {
    if (key) {
      dispatch(verifyEmail({ key }));
    }
  }, [dispatch, key]);

  useEffect(() => {
    if (emailVerificationData.success) {
      navigate("/login");
    }
  }, [emailVerificationData, navigate]);

  const renderError = () => {
    if (
      typeof emailVerificationData.error === "object" &&
      emailVerificationData.error !== null
    ) {
      return (
        (emailVerificationData.error as { detail?: string }).detail ||
        "Unknown error"
      );
    }
    return emailVerificationData.error || "Unknown error";
  };
  return emailVerificationData.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>Error: {renderError()}</div>
  );
};
