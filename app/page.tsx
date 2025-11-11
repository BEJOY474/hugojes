import Image from "next/image";
import CreateAccountPage from "./create-account/page";
import Dashboard from "./dashboard/page";
import Admin from "./admin/page";
import { Children } from "react";
import Login from "./login/page";

export default function Home() {
  return (
    <>
      <CreateAccountPage />
      {/* <Login /> */}
      {/* <Dashboard /> */}
      {/* <Admin /> */}
    </>
  );
}
