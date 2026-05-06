import '@/styles/globals.css';

export const metadata = {
  title: 'MTG Modern Stats - 万智牌摩登赛事数据',
  description: '综合 MTGTop8、MTGGoldfish、MTG Elo Project 等网站的摩登赛制数据分析',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-mtg-dark text-gray-100">
        {children}
      </body>
    </html>
  );
}
