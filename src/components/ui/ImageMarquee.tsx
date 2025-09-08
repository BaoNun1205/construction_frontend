/* eslint-disable react/no-unknown-property */
'use client'
import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

type Props = {
  speed?: number;
  gap?: number;
  imageHeight?: number;
  title?: string;
};

export default function ImageMarquee({
  speed = 150,
  gap = 8,
  imageHeight = 350,
  title = ''
}: Props) {
  // Use static images directly - no API needed
  const baseImages = [
    '/image/action1.jpg',
    '/image/action2.jpg',
    '/image/action3.jpg',
    '/image/action4.jpg'
  ]

  // Create many repetitions for smooth infinite scroll
  const images = Array(30).fill(baseImages).flat()

  // Calculate image dimensions
  const imageWidth = Math.round(imageHeight * 2.5) // 3:2 aspect ratio

  // Animation duration calculation
  const totalWidth = images.length * (imageWidth + gap)
  const duration = totalWidth / speed

  return (
    <Box sx={{
      overflow: 'hidden',
      width: '100%',
      py: 6,
      backgroundColor: '#f8f9fa'
    }}>
      <Typography
        variant="h2"
        className="font-bold text-center"
        sx={{
          marginBottom: '2rem',
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700
        }}
      >
        {title}
      </Typography>
      <div
        style={{
          display: 'flex',
          gap: `${gap}px`,
          alignItems: 'center',
          animation: `marquee ${duration}s linear infinite`,
          willChange: 'transform'
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
              overflow: 'hidden',
              position: 'relative',
              flex: '0 0 auto'
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes={`${imageWidth}px`}
              style={{ objectFit: 'cover' }}
              priority={index < 6}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            transform: translateX(-${(images.length / 3) * (imageWidth + gap)}px); 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </Box>
  )
}
