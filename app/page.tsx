import { Suspense } from 'react'
import MasonryLayout from '@/components/masonryLayout/MasonryLayout'
import Filters from '@/components/filter/Filter'
import Loading from '@/components/loading/Loading'
import { fetchImages } from '@/utils/pixabay'

export default async function Home({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  return (
    <div className='p-12'>
      <Filters currentCategory={searchParams.category} />
      <Suspense fallback={<Loading />}>
        <HomeContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function HomeContent({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const images = await fetchImages(searchParams.q, searchParams.category)
  return <MasonryLayout images={images} />
}