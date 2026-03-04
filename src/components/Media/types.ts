import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

export type PayloadImageSize = 'thumbnail' | 'medium' | 'large'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  height?: number
  htmlElement?: ElementType | null
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
  width?: number
  /** Which Payload image size to use as the initial fast-loading source */
  placeholderSize?: PayloadImageSize
  /** Disable progressive loading (always show original) */
  disableProgressiveLoad?: boolean
}
