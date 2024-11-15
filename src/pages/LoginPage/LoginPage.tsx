import { Link } from "react-router-dom";
import { SingInForm } from "../../components/SingInForm";

export const LoginPage = () => {
  return (
    <>
      <h1>LoginPage</h1>
      <SingInForm />
      <Link to="/registration">Register</Link>
    </>
  );
};
