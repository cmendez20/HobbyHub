import { Navbar } from "../../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-dvh">
        <Outlet />
      </div>
    </>
  );
};

export { RootLayout };
