'use client';

import { useState } from 'react';
import Link from 'next/link';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Meta', labelCN: '元游戏', href: '/#meta' },
    { label: 'Decks', labelCN: '套牌', href: '/#decks' },
    { label: 'Compare', labelCN: '对比', href: '/compare' },
    { label: 'Players', labelCN: '牌手', href: '/#players' },
    { label: 'Prices', labelCN: '牌价', href: '/#prices' },
    { label: 'Calendar', labelCN: '日历', href: '/calendar' },
    { label: 'About', labelCN: '关于', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-mtg-void/80 backdrop-blur-md border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-mtg-gold group-hover:brightness-110 transition-all">
              MTG Modern
            </span>
            <span className="text-xs text-gray-600 hidden sm:inline">Stats</span>
          </Link>

          {/* Desktop Nav + Search */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm text-gray-400 hover:text-mtg-gold hover:bg-mtg-card/50 rounded-lg transition-all"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-gray-600 ml-1 text-xs">{item.labelCN}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <GlobalSearch />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden py-3 pb-5 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-sm text-gray-400 hover:text-mtg-gold hover:bg-mtg-card rounded-lg transition-all"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-gray-600 ml-1.5">{item.labelCN}</span>
              </Link>
            ))}
            <div className="px-3 pt-3 border-t border-gray-800/60">
              <GlobalSearch />
            </div>
            <div className="px-3 pt-2 flex justify-end">
              <ThemeToggle />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
