"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  return (
    <nav className="bg-blue-600 text-white font-serif shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl">
            <Link href="/">
              Company Explorer
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/" className={`px-3 py-2 rounded hover:bg-blue-700 ${pathname === '/' ? 'bg-blue-700' : ''}`}>
              Companies
            </Link>
            <Link href="/notes" className={`px-3 py-2 rounded hover:bg-blue-700 ${pathname === '/notes' ? 'bg-blue-700' : ''}`}>
              Notes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
