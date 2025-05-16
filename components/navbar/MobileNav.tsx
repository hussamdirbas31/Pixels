import Link from 'next/link'
import SearchBar from './SearchBar'
import { FiMenu, FiX } from 'react-icons/fi'

interface MobileNavProps {
  isOpen: boolean
  onToggle: () => void
  scrolled: boolean
}

export default function MobileNav({ 
  isOpen, 
  onToggle,
  scrolled
}: MobileNavProps) {
  return (
    <>
      <div className="md:hidden flex items-center justify-between w-full">
        <button 
          onClick={onToggle}
          className={`p-2 rounded-md transition-all duration-300 ${
            scrolled ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
          } focus:outline-none`}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX size={scrolled ? 24 : 28} className="transition-all duration-300" />
          ) : (
            <FiMenu size={scrolled ? 24 : 28} className="transition-all duration-300" />
          )}
        </button>
        
        <Link 
          href="/" 
          className={`font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent transition-all duration-500 ${
            scrolled ? 'text-xl' : 'text-2xl'
          }`}
        >
          PixelCraft
        </Link>
        
        <div className="w-10"></div>
      </div>

      {isOpen && (
        <div className={`md:hidden pb-4 px-4 transition-all duration-500 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/30 mt-2`}>
          <div className="pt-3 mb-4">
            <SearchBar variant="futuristic" />
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link 
              href="/saved" 
              className={`px-4 py-3 rounded-lg flex items-center text-slate-200 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group`}
              onClick={onToggle}
            >
              <BookmarkIcon className={`mr-3 h-6 w-6 text-cyan-400 group-hover:text-indigo-400`} />
              <span className="font-medium">Saved</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" 
      />
    </svg>
  )
}