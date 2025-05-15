'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('query')?.toString()
    if (query) router.push(`/?q=${encodeURIComponent(query)}`)
  }

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 font-bold text-xl">
            Pinterest Clone
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                name="query"
                type="text"
                placeholder="Search images..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search images"
              />
            </div>
          </form>
          
          <Link href="/saved" className="px-4 py-2 text-blue-500 hover:text-blue-600">
            Saved
          </Link>
        </div>
      </div>
    </nav>
  )
}