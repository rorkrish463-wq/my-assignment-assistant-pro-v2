export const metadata = { title: 'Free Assignment Assistant' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Calibri, sans-serif', margin: 0, background: '#f5f7fb' }}>
        {children}
      </body>
    </html>
  );
}