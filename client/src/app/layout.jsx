import "./globals.css";
import NextProvider from "./NextProvider";
import ReduxProvider from "./ReduxProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NextProvider>
            <div className="absolute">
              <div className="loader-line hidden"></div>
            </div>
            {children}
          </NextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
