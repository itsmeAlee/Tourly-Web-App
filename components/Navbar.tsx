'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Home, Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/hotels', label: 'Hotels', icon: Building2 },
    { href: '/places', label: 'Places', icon: MapPin },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="fixed top-0 w-full z-50 bg-white border-b border-gray-200"
      style={{ height: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#2D5F5D]" />
          <span className="text-xl font-semibold text-gray-900">
            GB Tours
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isActive(item.href)
                  ? "bg-gray-100 text-[#2D5F5D]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="font-medium bg-[#2D5F5D] hover:bg-[#234745] text-white"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

