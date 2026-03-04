import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInTRY, title } = product

  let price = priceInTRY

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInTRY &&
      typeof variant.priceInTRY === 'number'
    ) {
      price = variant.priceInTRY
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false
  // Discount support: component will display discounted price when the product
  // prop includes a discount percentage. This keeps the UI ready for server
  // or query-side wiring which can add `discount` or `discountPercentage`.
  const discountPercentage =
    typeof (product as any).discount?.percentage === 'number'
      ? (product as any).discount.percentage
      : typeof (product as any).discountPercentage === 'number'
        ? (product as any).discountPercentage
        : undefined

  const discountedPrice =
    typeof price === 'number' && typeof discountPercentage === 'number'
      ? Math.round(price * (1 - discountPercentage / 100) * 100) / 100
      : undefined

  return (
    <Link className="relative inline-block h-full w-full group" href={`/products/${product.slug}`}>
      {image ? (
        <Media
          className={clsx('relative aspect-square object-cover p-8 bg-primary-foreground')}
          height={80}
          imgClassName={clsx('h-full w-full object-cover rounded-2xl', {
            'transition duration-300 ease-in-out group-hover:scale-106': true,
          })}
          resource={image}
          width={80}
          placeholderSize="thumbnail"
          size="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : null}

      <div className="font-mono font-bold text-primary/100 group-hover:text-primary/100 uppercase flex justify-between items-center mt-2">
        <div
          className="truncate max-w-[99%] block whitespace-nowrap overflow-hidden text-ellipsis"
          title={typeof title === 'string' ? title : undefined}
        >
          {title}
        </div>

        {typeof price === 'number' && (
          <div className="text-right">
            {typeof discountedPrice === 'number' ? (
              <div className="flex flex-col items-end">
                <div className="text-sm text-muted-foreground line-through">
                  <Price amount={price} className="text-sm" />
                </div>
                <div className="font-bold">
                  <Price amount={discountedPrice} className="text-lg" />
                </div>
              </div>
            ) : (
              <Price amount={price} className="text-lg" />
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
