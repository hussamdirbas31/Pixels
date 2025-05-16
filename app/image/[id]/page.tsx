import { fetchImageById } from '@/utils/pixabay'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ImageDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const image = await fetchImageById(params.id)
  
  if (!image) {
    return notFound()
  }
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Link 
          href="/" 
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          &larr; Back 
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-700/30 aspect-[4/3]">
          <Image
            src={image.largeImageURL}
            alt={image.tags || 'Pixabay image'}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 capitalize">
              {image.tags.split(',').join(', ')}
            </h1>
            <div className="flex items-center mt-2">
              {image.userImageURL && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={image.userImageURL}
                    alt={image.user}
                    width={40}
                    height={40}
                    className="object-cover"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              )}
              <span className="text-slate-300">By {image.user}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-cyan-400 font-semibold">{image.likes.toLocaleString()}</p>
              <p className="text-sm text-slate-400">Likes</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 font-semibold">{image.views.toLocaleString()}</p>
              <p className="text-sm text-slate-400">Views</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 font-semibold">{image.downloads.toLocaleString()}</p>
              <p className="text-sm text-slate-400">Downloads</p>
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold text-slate-100 mb-2">
              Image Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Resolution</p>
                <p className="text-slate-200">
                  {image.imageWidth} × {image.imageHeight} px
                </p>
              </div>
              <div>
                <p className="text-slate-400">Type</p>
                <p className="text-slate-200 capitalize">
                  {image.type || 'photo'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={image.pageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition-colors"
            >
              View on Pixabay
            </a>
            <a
              href={image.largeImageURL}
              download
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
            >
              Download Original
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


