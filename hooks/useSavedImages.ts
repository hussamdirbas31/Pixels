// hooks/useSavedImages.ts
'use client'

import { useState, useEffect } from 'react'
import { Image } from '@/utils/pixabay'

export const useSavedImages = () => {
  const [savedIds, setSavedIds] = useState<number[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedImages') || '[]')
    setSavedIds(saved.map((img: Image) => img.id))
  }, [])

  const toggleSave = (image: Image) => {
    const saved = JSON.parse(localStorage.getItem('savedImages') || '[]')
    const isSaved = saved.some((img: Image) => img.id === image.id)
    
    const newSaved = isSaved 
      ? saved.filter((img: Image) => img.id !== image.id)
      : [...saved, image]

    localStorage.setItem('savedImages', JSON.stringify(newSaved))
    setSavedIds(newSaved.map((img: Image) => img.id))
  }

  return { savedIds, toggleSave }
}