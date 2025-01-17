import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <div className="site-container">
      <Header />
      <main style={{ padding: "10px" }}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
