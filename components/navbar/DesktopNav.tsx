import Link from 'next/link'
import SearchBar from './SearchBar'

interface DesktopNavProps {
  windowWidth: number
  scrolled: boolean
}

export default function DesktopNav({ windowWidth, scrolled }: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <Link 
        href="/" 
        className={`flex-shrink-0 font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent transition-all duration-500 ${
          scrolled ? 'text-xl tracking-tight' : 'text-2xl tracking-wide'
        }`}
      >
        PixelCraft
      </Link>
      
      <div className="flex-1 mx-8 transition-all duration-300">
        <SearchBar 
          variant="futuristic"
          className={`transition-all duration-500 ${
            scrolled ? 'max-w-xl' : 'max-w-2xl'
          }`}
        />
      </div>
      
      <div className="flex items-center space-x-6">
        <Link 
          href="/saved" 
          className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 group ${
            scrolled 
              ? 'text-slate-300 hover:text-white text-sm' 
              : 'text-slate-200 hover:text-white text-base'
          } hover:bg-slate-800/50`}
        >
          <BookmarkIcon className={`mr-2 transition-all duration-300 ${
            scrolled ? 'h-5 w-5 text-cyan-400' : 'h-6 w-6 text-cyan-400'
          } group-hover:text-indigo-400`} />
          Saved
        </Link>
      </div>
    </div>
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