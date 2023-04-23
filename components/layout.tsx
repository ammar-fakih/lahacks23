import Image from 'next/image';
import Link from 'next/link';

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export default function Layout({ style, children, title = 'MuddBot' }: LayoutProps & {style?: React.CSSProperties}) {
  return (
    <div style={style} className="mx-auto flex flex-col space-y-4">
      <header className="container sticky top-0 z-40">
        <div className="h-16 border-b border-b-slate-200 py-4">
          <nav className="ml-4 pl-6">
            <Link
              href="/"
              className="hover:text-slate-600 cursor-pointer flex flex-row items-center"
            >
              <Image
                src="/logo.jpg"
                alt="MuddBot Logo"
                width={35}
                height={35}
              />
              {title}
            </Link>
          </nav>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
