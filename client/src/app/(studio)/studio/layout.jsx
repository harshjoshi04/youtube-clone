import Nav from "@/components/common/studio/Nav";
import Sidemenu from "@/components/common/studio/Sidemenu";

export default function RootLayout({ children }) {
  return (
    <div className="bg-[#282828] h-[100vh] overflow-hidden">
      <Nav />
      <Sidemenu>{children}</Sidemenu>
    </div>
  );
}
