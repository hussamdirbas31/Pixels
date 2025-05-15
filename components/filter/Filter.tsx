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
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full capitalize ${
            currentCategory === category 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}