import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Chat.module.css';

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export default function Layout({
  styleDarker = { backgroundColor: 'white' },
  styleLighter,
  children,
  title = 'MuddBot',
}: LayoutProps & {
  styleDarker?: React.CSSProperties;
  styleLighter?: React.CSSProperties;
}) {
  return (
    <div style={styleDarker} className="mx-auto flex flex-col  ">
      <header
        className="container sticky top-0 z-40 drop-shadow-lg"
        style={{ minWidth: '100%' }}
      >
        <div style={styleDarker} className=" p-2">
          <nav style={styleLighter} className="ml-4 p-1 mr-4">
            <Link
              href="/"
              className="hover:text-slate-600 cursor-pointer flex flex-row items-center"
            >
              <Image
                src="/logo.jpg"
                alt="MuddBot Logo"
                width={50}
                height={50}
                style={{
                  padding: '6px',
                  borderRadius: '0.5rem',
                }}
              />
              &nbsp;&nbsp;
              <h2 className="text-4xl font-bold">{title}</h2>
              {/* {title} */}
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
