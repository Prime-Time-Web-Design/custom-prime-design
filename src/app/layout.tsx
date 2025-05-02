
import "./../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <NavigationProvider> */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">{children}</main>
          {/* Footer can be added here */}
        </div>
        {/* </NavigationProvider> */}
      </body>
    </html>
  );
}
