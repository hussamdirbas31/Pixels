'use client'

import { Image } from '@/utils/pixabay'
import { ImageCard } from './ImageCard'
import { useSavedImages } from './useSavedImages'

interface MasonryLayoutProps {
  images: Image[]
  onImageRemove?: (id: number) => void
  isSavedPage?: boolean
}

export const MasonryLayout = ({ 
  images, 
  onImageRemove,
  isSavedPage = false
}: MasonryLayoutProps) => {
  const { savedIds, toggleSave } = useSavedImages()

  const handleToggleSave = (image: Image) => {
    toggleSave(image)
    if (isSavedPage && onImageRemove) {
      onImageRemove(image.id)
    }
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No images found.
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {images.map((image) => (
        <ImageCard 
          key={image.id}
          image={image}
          isSaved={savedIds.includes(image.id)}
          onToggleSave={() => handleToggleSave(image)}
          showRemoveButton={isSavedPage}
        />
      ))}
    </div>
  )
}