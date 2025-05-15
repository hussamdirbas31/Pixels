'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { Image } from '@/utils/pixabay'

export default function MasonryLayout({ images }: { images: Image[] }) {
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

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="break-inside-avoid"
        >
          <div className="relative group">
            <button 
              onClick={() => toggleSave(image)}
              className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
            >
              {savedIds.includes(image.id) ? (
                <HeartSolid className="w-6 h-6 text-red-500" />
              ) : (
                <HeartOutline className="w-6 h-6 text-gray-600" />
              )}
            </button>
            
            <Link href={`/image/${image.id}`} className="block">
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className="w-full object-cover"
                  style={{
                    height: `${(image.imageHeight / image.imageWidth) * 300}px`
                  }}
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-end p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-semibold">By {image.user}</p>
                    <div className="flex gap-4 mt-2">
                      <span>❤️ {image.likes}</span>
                      <span>👁️ {image.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}