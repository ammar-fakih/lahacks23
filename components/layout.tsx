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
        <div style={styleDarker} className="p-2 flex justify-between">
          <nav className="ml-4 p-1 mr-4">
            <Link
              href="/"
              className="hover:text-slate-600 cursor-pointer flex flex-row items-center  z-40"
            >
              <Image
                src="/muddbots.jpg"
                alt="MuddBot Logo"
                width={200}
                height={50}
                style={{
                  padding: '6px',
                  borderRadius: '1rem',
                }}
              />
              &nbsp;&nbsp;
              {/* <h2 className="text-4xl font-bold">{title}</h2> */}
              {/* {title} */}
            </Link>
          </nav>

          <div className="flex flex-row justify-end pr-10">
            <Link
              className="hover:text-slate-800 cursor-pointer flex flex-row items-center"
              href="/"
            >
              <h2 className="text-xl font-bold">➕ Add Your Book</h2>
            </Link>
          </div>
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
