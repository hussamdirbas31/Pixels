import { Suspense } from 'react'
import { MasonryLayout } from '@/components/masonryLayout' // Changed to named import
import Filters from '@/components/filter/Filter'
import Loading from '@/components/loading/Loading'
import { fetchImages } from '@/utils/pixabay'
import { SearchParams } from '@/lib/types/types'

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const searchQuery = searchParams.q?.toString() || ''
  const category = searchParams.category?.toString() || 'all'

  return (
    <main className="container mx-auto px-4 py-8">
      <Filters currentCategory={category} />
      <Suspense 
        fallback={
          <div className="mt-8">
            <Loading />
          </div>
        }
      >
        <MasonryContent 
          searchQuery={searchQuery} 
          category={category} 
        />
      </Suspense>
    </main>
  )
}

async function MasonryContent({
  searchQuery,
  category,
}: {
  searchQuery: string
  category: string
}) {
  try {
    const images = await fetchImages(searchQuery, category)
    return <MasonryLayout images={images} />
  } catch (error) {
    console.error('Failed to load images:', error)
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load images. Please try again later.
      </div>
    )
  }
}