import { Link } from "react-router-dom";
import { RegistrationForm } from "../../components/RegistrationForm";

export const RegistrationPage = () => {
  return (
    <div>
      <h1>Registration Page</h1>
      <RegistrationForm />
      <Link to="/login">Login page</Link>
    </div>
  );
};
