import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../context/userLog";

export default function DashboardHeader() {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <header
        style={{
          height: "65px",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="dashboard_header_content">
          
          <div className="dashboard_header_card" style={{ marginRight: "20px" }}>
            <p>{user.society}</p>
            <div className="nav_button" style={{ overflow: "hidden" }}>
              <Image
                src={user.profile_picture ? user.profile_picture : "/image.svg"}
                alt="Recherche"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="dashboard_header_card" style={{width: "auto"}}>
          <div className="nav_button" style={{ overflow: "hidden" }}>
          <Image
                src="/mail.svg"
                alt="Recherche"
                height="20px"
                width="20px"
                objectFit="contain"
              />
          </div>
          
              </div>
        </div>
      </header>
    </>
  );
}
