'use client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

interface SearchBarProps {
  className?: string
  variant?: 'default' | 'futuristic'
  onFocusChange?: (isFocused: boolean) => void
}

export default function SearchBar({ 
  className = '',
  variant = 'futuristic',
  onFocusChange
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocusChange?.(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    onFocusChange?.(false)
  }

  const handleClear = () => {
    setQuery('')
    onFocusChange?.(false)
  }

  if (variant === 'futuristic') {
    return (
      <form onSubmit={handleSearch} className={`relative ${className}`}>
        <div className={`relative transition-all duration-300 ${isFocused ? 'ring-2 ring-cyan-400/30 shadow-lg' : ''}`}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className={`h-5 w-5 transition-all duration-300 ${
              isFocused ? 'text-cyan-400' : 'text-slate-400'
            }`} />
          </div>
          <input
            name="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for creative designs..."
            className={`w-full py-2.5 pl-10 pr-10 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400/50 text-slate-100 placeholder-slate-400/70 transition-all duration-300 ${
              query ? 'pr-10 bg-slate-800/70' : ''
            }`}
            aria-label="Search images"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              aria-label="Clear search"
            >
              <IoClose className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="h-5 w-5 text-slate-400" />
        </div>
        <input
          name="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images..."
          className={`w-full px-4 py-2 pl-10 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent ${
            query ? 'pr-10' : ''
          }`}
          aria-label="Search images"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-cyan-400"
            aria-label="Clear search"
          >
            <IoClose className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  )
}