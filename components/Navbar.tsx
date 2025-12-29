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
    { href: '/guides', label: 'Guides', icon: Compass },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="fixed top-0 w-full z-50 bg-card"
      style={{ height: '64px', boxShadow: 'var(--shadow-floating-md)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold text-foreground">
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
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
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
              className="font-medium"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="font-medium"
              style={{ boxShadow: 'var(--shadow-tactile)' }}
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

