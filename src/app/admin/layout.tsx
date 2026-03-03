import '@/app/globals.css';

const systemFont = "Inter, system-ui, -apple-system, sans-serif";

export const metadata = {
    title: 'PortfolioPro CMS | Login',
    description: 'Secure admin gateway',
    robots: 'noindex, nofollow',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                style={{ fontFamily: systemFont }}
                className="bg-[#050505] text-white antialiased"
            >
                {children}
            </body>
        </html>
    );
}
