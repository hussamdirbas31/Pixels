'use client'

import { useRouter } from 'next/navigation'

const categories = [
  'all', 'fashion', 'nature', 'science', 'education',
  'feelings', 'religion', 'places', 'animals', 'industry',
  'computer', 'food', 'sports', 'transportation', 'travel'
]

export default function Filters({ currentCategory }: { currentCategory?: string }) {
  const router = useRouter()
  
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set('category', category)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 px-4 sm:px-6 lg:px-8 py-8 bg-slate-900/30 backdrop-blur-sm border-t border-slate-700/30">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-xl capitalize text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
            currentCategory === category 
              ? 'bg-gradient-to-r from-cyan-400/80 to-indigo-500/80 text-slate-900 shadow-lg'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/60 hover:text-slate-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}