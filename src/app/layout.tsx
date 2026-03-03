// Removed Google Font import to prevent build fetch errors
import "./globals.css";
const systemFont = "Inter, system-ui, -apple-system, sans-serif";

export const metadata = {
  title: "TOH HANSLAY | Digital Experiences",
  description: "Creative developer and designer specializing in immersive web experiences.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: systemFont }}
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

