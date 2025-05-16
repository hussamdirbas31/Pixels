// components/ImageCard.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import { Image as PixabayImage } from '@/utils/pixabay'

interface ImageCardProps {
  image: PixabayImage
  isSaved: boolean
  onToggleSave: (image: PixabayImage) => void
  showRemoveButton?: boolean
  onRemove?: (id: number) => void
}

export const ImageCard = ({ 
  image, 
  isSaved, 
  onToggleSave,
  showRemoveButton = false,
  onRemove
}: ImageCardProps) => {
  const aspectRatio = (image.imageHeight / image.imageWidth) * 100
  
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="break-inside-avoid mb-4"
  >
    <div className="relative group">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {showRemoveButton ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              onRemove?.(image.id)
            }}
            className="p-2 bg-red-500/90 rounded-xl backdrop-blur-sm hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <TrashIcon className="w-6 h-6 text-white" />
          </button>
        ) : (
          <button 
            onClick={(e) => {
              e.preventDefault()
              onToggleSave(image)
            }}
            className="p-2 bg-slate-800/50 rounded-xl backdrop-blur-sm hover:bg-slate-700/60 transition-colors"
            aria-label={isSaved ? 'Unsave image' : 'Save image'}
          >
            {isSaved ? (
              <HeartSolid className="w-6 h-6 text-cyan-400" />
            ) : (
              <HeartOutline className="w-6 h-6 text-slate-300" />
            )}
          </button>
        )}
      </div>
      
      <Link href={`/image/${image.id}`} className="block" scroll={false}>
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-700/30">
          <div 
            className="w-full relative"
            style={{ paddingBottom: `${aspectRatio}%` }}
          >
            <Image
              src={image.webformatURL}
              alt={image.tags}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = `https://i.pinimg.com/originals/${image.id}.jpg`
              }}
            />
          </div>
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-opacity flex items-end p-4 pointer-events-none">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="font-semibold">By {image.user}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>❤️ {image.likes}</span>
                <span>👁️ {image.views}</span>
                <span>💾 {image.downloads}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </motion.div>
  )
}