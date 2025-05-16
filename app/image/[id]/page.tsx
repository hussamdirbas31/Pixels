import { fetchImageById } from '@/utils/pixabay'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'


export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const image = await fetchImageById(params.id)
    
    return {
      title: image?.tags ? `${image.tags} - PixelCraft` : 'Image - PixelCraft',
      description: image?.user ? `Image by ${image.user}` : 'Beautiful image from PixelCraft',
      openGraph: {
        images: [{
          url: image?.webformatURL || '/default-image.jpg',
          width: image?.imageWidth || 1200,
          height: image?.imageHeight || 630,
          alt: image?.tags || 'PixelCraft image',
        }]
      }
    }
  } catch {
    return {
      title: 'Image - PixelCraft',
      description: 'Beautiful image from PixelCraft',
    }
  }
}

export default async function ImagePage({
  params,
}: {
  params: { id: string }
}) {
  let image
  try {
    image = await fetchImageById(params.id)
  } catch {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error loading image</h1>
        <Link 
          href="/" 
          className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    )
  }

  if (!image) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-slate-300 mb-4">Image not found</h1>
        <Link 
          href="/" 
          className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          ← Back
        </Link>
      </div>
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
            <div className="flex items-center gap-2">
              ❤️ {image.likes || 0}
            </div>
            <div className="flex items-center gap-2">
              👁️ {image.views || 0}
            </div>
            <div className="flex items-center gap-2">
              ⬇️ {image.downloads || 0}
            </div>
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