import "./../styles/globals.css";
import { Header } from "@/components/organisms/header/Header";
import { NavigationProvider } from "@/providers/NavigationProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            {/* Footer can be added here */}
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}
