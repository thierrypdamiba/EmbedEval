import { NavBar } from '@/components/NavBar';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="container mx-auto mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
