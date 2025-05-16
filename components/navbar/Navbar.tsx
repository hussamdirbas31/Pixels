'use client'

import { useState, useEffect } from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // initialize scroll state
    setScrolled(window.scrollY > 10)

    const handleScroll = () => setScrolled(window.scrollY > 10)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-md bg-slate-900/95 border-b border-slate-700/30
        transition-all duration-500
        ${scrolled ? 'py-0 shadow-lg' : 'py-2'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`
            flex items-center justify-between
            ${scrolled ? 'h-14' : 'h-16'}
            transition-all duration-500
          `}
        >
          <DesktopNav scrolled={scrolled} />
          <MobileNav
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            scrolled={scrolled}
          />
        </div>
      </div>

      {/* subtle glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-400/10 opacity-15" />
      </div>
    </nav>
  )
}
