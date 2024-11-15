import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation__container">
        <div className="navigation__logo"></div>
        <div className="navigation__links">
          <NavLink to="/" className="navigation__link">
            Home
          </NavLink>
          <br />
          <NavLink to="/profile" className="navigation__link">
            Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};
