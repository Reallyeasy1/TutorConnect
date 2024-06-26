//TODO: Change Nav bar to use shadcn
//Issue most likely due to next-auth
import Image from "next/image";

export default function Logo() {
  const container = {
    display: "flex",
    alignItems: "center",
  }

  const avatar = {
    width: 50,
    height: 50,
    borderRadius: "50%",
    overflow: "hidden",
  }

  return (
    <div style={container}>
      <div style={avatar}>
        <Image src="/images/logo.png" alt="App logo" width={50} height={50} />
      </div>
    </div>
  );
}