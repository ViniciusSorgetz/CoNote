import "@/app/dashboard/index.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container w-[1100px] max-w-[90%] mx-auto">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
