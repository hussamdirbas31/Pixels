// app/image/[id]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchImageById } from '@/utils/pixabay'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const image = await fetchImageById(id)

  return {
    title: image?.tags ? `${image.tags} - PixelCraft` : 'Image - PixelCraft',
    description: image?.user ? `Image by ${image.user}` : 'Beautiful image from PixelCraft',
    openGraph: {
      images: [
        {
          url: image?.webformatURL ?? '/default-image.jpg',
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
  if (!image) notFound()

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* هنا يمكنك استخدام <Image> لعرض الصورة */}
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        ← Back to home
      </Link>
    </main>
  )
}
