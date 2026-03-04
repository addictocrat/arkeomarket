'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/cn'
import NextImage from 'next/image'
import React, { useEffect, useState } from 'react'

import type { Props as MediaProps } from '../types'
import type { Media as MediaType } from '@/payload-types'

import { cssVariables } from '@/cssVariables'

const { breakpoints } = cssVariables

function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
}

function getImageSizeUrl(
  resource: MediaType,
  sizeName: 'thumbnail' | 'medium' | 'large',
): string | null {
  const sizes = (resource as any).sizes
  if (!sizes) return null
  const sizeData = sizes[sizeName]
  if (!sizeData?.url) return null
  return resolveMediaUrl(sizeData.url as string)
}

function getImageSizeDimensions(
  resource: MediaType,
  sizeName: 'thumbnail' | 'medium' | 'large',
): { width: number | null; height: number | null } {
  const sizes = (resource as any).sizes
  if (!sizes) return { width: null, height: null }
  const sizeData = sizes[sizeName]
  return { width: sizeData?.width ?? null, height: sizeData?.height ?? null }
}

/**
 * Inner component that handles progressive placeholder → full-res swap.
 * Uses native `new window.Image()` to preload the full-res URL — this fires
 * reliably regardless of CSS visibility, unlike Next.js Image's onLoad.
 */
const ProgressiveImage: React.FC<{
  placeholderSrc: string
  fullSrc: string
  fill?: boolean
  alt: string
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  priority?: boolean
  sizes: string
  width?: number | null
  height?: number | null
}> = ({
  placeholderSrc,
  fullSrc,
  fill,
  alt,
  imgClassName,
  onClick,
  onLoad: onLoadProp,
  priority,
  sizes,
  width,
  height,
}) => {
  // Start showing placeholder, swap to full-res once preloaded
  const [activeSrc, setActiveSrc] = useState<string>(placeholderSrc)
  const [isFullRes, setIsFullRes] = useState(false)

  useEffect(() => {
    if (!fullSrc) return
    let cancelled = false

    const img = new window.Image()

    img.onload = () => {
      if (!cancelled) {
        setActiveSrc(fullSrc)
        setIsFullRes(true)
        if (typeof onLoadProp === 'function') onLoadProp()
      }
    }

    // On error: silently keep the placeholder — no crash
    img.onerror = () => {}

    img.src = fullSrc

    return () => {
      cancelled = true
    }
  }, [fullSrc, onLoadProp])

  const quality = isFullRes ? 90 : 60

  if (fill) {
    return (
      <NextImage
        alt={alt}
        className={cn(imgClassName, 'transition-opacity duration-500')}
        fill
        onClick={onClick}
        priority={priority}
        quality={quality}
        sizes={sizes}
        src={activeSrc}
      />
    )
  }

  return (
    <NextImage
      alt={alt}
      className={cn(imgClassName, 'transition-opacity duration-500')}
      height={height ?? undefined}
      onClick={onClick}
      priority={priority}
      quality={quality}
      sizes={sizes}
      src={activeSrc}
      width={width ?? undefined}
    />
  )
}

export const Image: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    height: heightFromProps,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    width: widthFromProps,
    placeholderSize,
    disableProgressiveLoad,
  } = props

  let width: number | undefined | null
  let height: number | undefined | null
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let placeholderSrc: string | null = null
  let placeholderWidth: number | null = null
  let placeholderHeight: number | null = null

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = widthFromProps ?? fullWidth
    height = heightFromProps ?? fullHeight
    alt = altFromResource
    src = resolveMediaUrl(url)

    if (!disableProgressiveLoad) {
      const pSize = placeholderSize || 'medium'
      placeholderSrc = getImageSizeUrl(resource, pSize)
      const dims = getImageSizeDimensions(resource, pSize)
      placeholderWidth = dims.width
      placeholderHeight = dims.height
    }
  }

  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(', ')

  // Use progressive loading when a sized placeholder URL exists
  if (placeholderSrc && typeof src === 'string' && src && !disableProgressiveLoad) {
    return (
      <ProgressiveImage
        alt={alt || ''}
        fill={fill}
        fullSrc={src}
        height={height ?? placeholderHeight}
        imgClassName={imgClassName}
        onClick={onClick}
        onLoad={onLoadFromProps}
        placeholderSrc={placeholderSrc}
        priority={priority}
        sizes={sizes}
        width={width ?? placeholderWidth}
      />
    )
  }

  // Fallback: single image, no progressive loading
  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? ((height || heightFromProps) ?? undefined) : undefined}
      onClick={onClick}
      onLoad={() => {
        if (typeof onLoadFromProps === 'function') onLoadFromProps()
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? ((width || widthFromProps) ?? undefined) : undefined}
    />
  )
}
