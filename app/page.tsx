import Image from "next/image";
import CreateAccountPage from "./create-account/page";
import Dashboard from "./dashboard/page";
import { Children } from "react";

export default function Home() {
  return (
    <>
      <CreateAccountPage />
      {/* <Dashboard /> */}
    </>
  );
}
