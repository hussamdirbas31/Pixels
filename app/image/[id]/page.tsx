// app/image/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import { fetchImageById } from '@/utils/pixabay'

/**  
 * الآن params هو Promise<{ id: string }>
 */
interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params  // ننتظر لتفكيك الـPromise
  const image = await fetchImageById(id)

  return {
    title: image?.tags
      ? `${image.tags} • PixelCraft`
      : 'PixelCraft Image',
    description: image?.user
      ? `Photo by ${image.user}`
      : 'Beautiful image from PixelCraft',
    openGraph: {
      images: [
        {
          url: image?.largeImageURL ?? '/default-image.jpg',
          width: image?.imageWidth ?? 1200,
          height: image?.imageHeight ?? 630,
          alt: image?.tags ?? 'PixelCraft image',
        },
      ],
    },
  }
}

export default async function ImagePage({ params }: Props) {
  const { id } = await params
  const image = await fetchImageById(id)

  if (!image) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Image not found
        </h1>
        <Link href="/" className="text-cyan-400 hover:text-cyan-300">
          ← Back to home
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      {/* … بقية العرض كما في حالتك الأصلية … */}
    </main>
  )
}
