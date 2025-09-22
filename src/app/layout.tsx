import QueryClientProvider from '@/hooks/api/QueryClientProvider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
