//TODO: Change Nav bar to use shadcn
//Issue most likely due to next-auth
import Image from "next/image";

export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "12px" }}> {/* Added marginRight */}
      <Image src="/images/logo.png" alt="App logo" width={50} height={50} />
    </div>
  );
}

