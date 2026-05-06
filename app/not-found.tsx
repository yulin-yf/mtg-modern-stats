import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-mtg-gold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-2">Page Not Found / 页面未找到</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist.
          <br />
          您访问的页面不存在。
        </p>
        <Link href="/" className="btn-primary">
          Back to Home / 返回首页
        </Link>
      </div>
    </div>
  );
}
