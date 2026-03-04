'use client'
import React from 'react'

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

export const MediumImpactHero: React.FC<Page['hero']> = ({
  carouselItems,
  links,
  media,
  richText,
}) => {
  return (
    <div className="">
      <div className="container mt-6 md:hidden">
        {richText && <RichText className="" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
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
      <div className="px-8 md:px-0 mt-3 md:mt-0">
        {Array.isArray(carouselItems) && carouselItems.length > 0 ? (
          <Carousel
            className="w-full"
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
            <CarouselContent className="-ml-0">
              {carouselItems.map(({ media: itemMedia }, i) => (
                <CarouselItem className="pl-0" key={i}>
                  <div className="relative h-[28vh] md:h-[60vh] overflow-hidden">
                    {itemMedia && typeof itemMedia === 'object' && (
                      <Media
                        fill
                        className="-mx-4 md:w-full"
                        imgClassName="w-full rounded-lg md:rounded-none object-cover object-center"
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
            <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 border-none text-white" />
            <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 border-none text-white" />
          </Carousel>
        ) : (
          media &&
          typeof media === 'object' && (
            <div className="">
              <Media
                className="-mx-4 md:w-full "
                imgClassName="w-full rounded-lg md:rounded-none"
                priority
                resource={media}
                placeholderSize="large"
                size="100vw"
              />
              {media?.caption && (
                <div className="mt-3">
                  <RichText data={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
