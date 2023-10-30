import TitleBar from "@/components/common/TitleBar";

export default function RootLayout({ children }) {
  return (
    <>
      <TitleBar />
      {children}
    </>
  );
}
