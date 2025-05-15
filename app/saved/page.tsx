import { Suspense } from 'react'
import MasonryLayout from '@/components/masonryLayout/MasonryLayout'
import Filters from '@/components/filter/Filter'
import Loading from '@/components/loading/Loading'
import { fetchImages } from '@/utils/pixabay'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchQuery = searchParams.q?.toString() || ''
  const category = searchParams.category?.toString() || 'all'

  return (
    <>
      <Filters currentCategory={category} />
      <Suspense fallback={<Loading />}>
        <MasonryContent searchQuery={searchQuery} category={category} />
      </Suspense>
    </>
  )
}

async function MasonryContent({
  searchQuery,
  category,
}: {
  searchQuery: string
  category: string
}) {
  const images = await fetchImages(searchQuery, category)
  return <MasonryLayout images={images} />
}