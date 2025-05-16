// components/MasonryLayout.tsx
'use client'

import { Image } from '@/utils/pixabay'
import { ImageCard } from './ImageCard'
import { useSavedImages } from '@/hooks/useSavedImages'
import { useEffect, useRef } from 'react'
import { useInfiniteImages } from '@/hooks/useInfiniteImages'

interface MasonryLayoutProps {
  initialImages: Image[]
  onImageRemove?: (id: number) => void
  isSavedPage?: boolean
  searchQuery: string
  category: string
}

export const MasonryLayout = ({ 
  initialImages,
  onImageRemove,
  isSavedPage = false,
  searchQuery,
  category
}: MasonryLayoutProps) => {
  const { savedIds, toggleSave } = useSavedImages()
  const { images, loadMore, hasMore, isLoading } = useInfiniteImages(initialImages, searchQuery, category)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) observer.observe(currentTarget)

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [hasMore, isLoading, loadMore])

  const handleToggleSave = (image: Image) => {
    toggleSave(image)
    if (isSavedPage && onImageRemove) {
      onImageRemove(image.id)
    }
  }

  if (!images.length) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No images found.
      </div>
    )
  }

  return (
    <>
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
      
      {hasMore && (
        <div ref={observerTarget} className="h-20 w-full flex justify-center items-center py-4">
          {isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500" />
          )}
        </div>
      )}
    </>
  )
}