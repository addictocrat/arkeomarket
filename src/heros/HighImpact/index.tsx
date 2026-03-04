'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export const HighImpactHero: React.FC<Page['hero']> = ({
  carouselItems,
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[11rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center pointer-events-none">
        <div className="max-w-[36.5rem] md:text-center pointer-events-auto">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 min-h-[80vh] select-none ">
        {Array.isArray(carouselItems) && carouselItems.length > 0 ? (
          <Carousel
            className="w-full h-full"
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent className="-ml-0 h-full">
              {carouselItems.map(({ media: itemMedia }, i) => (
                <CarouselItem className="pl-0 h-full" key={i}>
                  <div className="relative h-[80vh] w-full">
                    {itemMedia && typeof itemMedia === 'object' && (
                      <Media
                        fill
                        imgClassName="-z-10 object-cover object-center"
                        priority={i === 0}
                        resource={itemMedia}
                        placeholderSize={i === 0 ? 'large' : 'medium'}
                        size="100vw"
                      />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-transparent border-white text-white hover:bg-white/20" />
            <CarouselNext className="right-4 bg-transparent border-white text-white hover:bg-white/20" />
          </Carousel>
        ) : (
          media &&
          typeof media === 'object' && (
            <div className="relative h-[80vh] w-full">
              <Media
                fill
                imgClassName="-z-10 object-cover"
                priority={true}
                resource={media}
                placeholderSize="large"
                size="100vw"
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}
