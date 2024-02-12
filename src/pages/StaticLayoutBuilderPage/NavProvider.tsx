import { ReactNode } from "react";
import RightNav from "./right-nav";
import LeftNav from "./left-nav";
// import { selectStaticPage, useSelector } from "@/lib/redux";

const NavProvider = ({ children }: { children: ReactNode }) => {
  // const { activeI } = useSelector(selectStaticPage);
  return (
    <div
      className="NavProvider"
      style={{
        display: "flex",
        overflow: "auto",
      }}
    >
      <LeftNav />
      {children}
      <RightNav />
    </div>
  );
};

export default NavProvider;
