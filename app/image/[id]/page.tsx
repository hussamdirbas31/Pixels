// app/image/[id]/page.tsx

import { fetchImageById } from '@/utils/pixabay'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const image = await fetchImageById(params.id)

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

export default async function ImagePage({ params }: PageProps) {
  const image = await fetchImageById(params.id)

  if (!image) {
    return (
      <ErrorSection message="Image not found or failed to load." />
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-700/30">
          <Image
            src={image.largeImageURL}
            alt={image.tags || 'PixelCraft image'}
            width={image.imageWidth}
            height={image.imageHeight}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            {image.tags || 'Untitled Image'}
          </h1>

          <div className="flex items-center gap-3">
            <Image
              src={image.userImageURL || '/default-avatar.png'}
              alt={image.user || 'Unknown artist'}
              width={48}
              height={48}
              className="rounded-full border-2 border-cyan-400/50"
            />
            <p className="text-slate-300">{image.user || 'Unknown artist'}</p>
          </div>

          <div className="flex gap-6 text-slate-300">
            <StatItem label="❤️" value={image.likes} />
            <StatItem label="👁️" value={image.views} />
            <StatItem label="⬇️" value={image.downloads} />
          </div>

          <a
            href={image.largeImageURL}
            download
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/80 to-indigo-500/80 text-slate-900 px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-medium"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download
          </a>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  )
}

// Components
function StatItem({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex items-center gap-2">
      {label} {value ?? 0}
    </div>
  )
}

function ErrorSection({ message }: { message: string }) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">{message}</h1>
      <Link
        href="/"
        className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  )
}
