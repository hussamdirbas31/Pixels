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
  const image = await fetchImageById(params.id)
  
  return {
    title: `${image.tags} - Pinterest Clone`,
    description: `Image by ${image.user} - ${image.tags}`,
    openGraph: {
      images: [{
        url: image.webformatURL,
        width: image.imageWidth,
        height: image.imageHeight,
        alt: image.tags,
      }]
    }
  }
}

export default async function ImagePage({
  params,
}: {
  params: { id: string }
}) {
  const image = await fetchImageById(params.id)

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={image.largeImageURL}
            alt={image.tags}
            width={image.imageWidth}
            height={image.imageHeight}
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{image.tags}</h1>
          <div className="flex items-center gap-2">
            <Image
              src={image.userImageURL}
              alt={image.user}
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-gray-600">{image.user}</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              ❤️ {image.likes}
            </div>
            <div className="flex items-center gap-1">
              👁️ {image.views}
            </div>
            <div className="flex items-center gap-1">
              ⬇️ {image.downloads}
            </div>
          </div>
          
          <a
            href={image.largeImageURL}
            download
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download
          </a>
        </div>
      </div>
      
      <Link href="/" className="mt-8 inline-block text-blue-500 hover:underline">
        ← Back to home
      </Link>
    </div>
  )
}