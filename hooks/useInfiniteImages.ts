// hooks/useInfiniteImages.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Image } from '@/utils/pixabay'
import { fetchImages } from '@/utils/pixabay'

export function useInfiniteImages(initialImages: Image[], searchQuery: string, category: string) {
  const [images, setImages] = useState(initialImages)
  const [page, setPage] = useState(2) // Start from page 2 since initial is page 1
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    try {
      const newImages = await fetchImages(searchQuery, category, page)
      if (newImages.length === 0) {
        setHasMore(false)
      } else {
        setImages(prev => [...prev, ...newImages])
        setPage(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error loading more images:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMore, page, searchQuery, category])

  return { images, loadMore, hasMore, isLoading }
}