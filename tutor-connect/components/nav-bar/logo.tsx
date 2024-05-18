import Image from "next/image";
import logo from "../public/images/logo.png";

export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* <h3>TutorConnect</h3> */}
      <Image src="/images/logo.png" alt="App logo" width={100} height={100} />
    </div>
  );
}
