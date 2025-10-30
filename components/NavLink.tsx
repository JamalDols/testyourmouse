"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackNavigation } from "@/lib/analytics";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isPro?: boolean;
}

export function NavLink({ href, children, isPro = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = () => {
    trackNavigation(href, "header_nav");
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
        isPro ? "text-purple-400/70 hover:text-purple-400 hover:bg-purple-500/10" : isActive ? "text-cyan-400 bg-cyan-500/10" : "text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-500/10"
      }`}
    >
      {children}
      {isPro && <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" aria-hidden="true" />}
    </Link>
  );
}
