// app/page.tsx
import { Suspense } from 'react'
import { MasonryLayout } from '@/components/masonryLayout'
import Filters from '@/components/filter/Filter'
import Loading from '@/components/loading/Loading'
import { fetchImages } from '@/utils/pixabay'

export interface SearchParams {
  q?: string
  category?: string
}

export default async function Home({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await the Promise so we can destructure safely
  const { q: searchQuery = '', category = 'all' } = await searchParams

  return (
    <main className="container mx-auto px-4 py-8">
      <Filters currentCategory={category} />
      <Suspense fallback={<Loading />}>
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
  category
}: {
  searchQuery: string
  category: string
}) {
  const initialImages = await fetchImages(searchQuery, category, 1)

  return (
    <MasonryLayout
      initialImages={initialImages}
      searchQuery={searchQuery}
      category={category}
    />
  )
}
