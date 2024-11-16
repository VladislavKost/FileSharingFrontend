import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

export const Navigation = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  return (
    <div className="navigation">
      <div className="navigation__container">
        <div className="navigation__logo"></div>
        <div className="navigation__links">
          <NavLink to="/" className="navigation__link">
            Home
          </NavLink>
          <br />
          {isAuth && (
            <NavLink to="/profile" className="navigation__link">
              Profile
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
