import 'bootstrap/dist/css/bootstrap.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black vh-100">
        {children}
      </body>
    </html>
  );
}
