import { Outlet } from "react-router-dom";
import Nav from "../components/Navbar";
import FooterComponent from "../components/Footer";

export default function BaseLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <FooterComponent />
    </>
  );
}
