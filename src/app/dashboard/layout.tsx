import "@/app/dashboard/index.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>CoNote</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
