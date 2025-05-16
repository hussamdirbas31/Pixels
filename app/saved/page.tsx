// app/saved/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { MasonryLayout } from '@/components/masonryLayout/index'
import { Image } from '@/utils/pixabay'
import Loading from '@/components/loading/Loading'

export default function SavedPage() {
  const [savedImages, setSavedImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSavedImages = () => {
      const saved = JSON.parse(localStorage.getItem('savedImages') || '[]')
      setSavedImages(saved)
      setIsLoading(false)
    }

    loadSavedImages()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'savedImages') {
        loadSavedImages()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleRemove = (id: number) => {
    const updated = savedImages.filter(img => img.id !== id)
    setSavedImages(updated)
    localStorage.setItem('savedImages', JSON.stringify(updated))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading />
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Your Saved Images
        {savedImages.length > 0 && (
          <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">
            ({savedImages.length})
          </span>
        )}
      </h1>

      {savedImages.length > 0 ? (
        <MasonryLayout 
          initialImages={savedImages}
          onImageRemove={handleRemove}
          isSavedPage={true}
          searchQuery=""
          category="all"
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            You haven&apos;t saved any images yet.
          </p>
        </div>
      )}
    </main>
  )
}