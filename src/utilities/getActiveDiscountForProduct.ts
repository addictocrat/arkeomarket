import { getPayload } from 'payload'

type ActiveDiscount = {
  id: string
  title: string
  percentage: number
}

/**
 * Find an active discount for a product.
 *
 * Usage (server-side):
 * const discount = await getActiveDiscountForProduct({ payload, productId })
 */
export const getActiveDiscountForProduct = async ({
  payload,
  productId,
}: {
  payload?: any
  productId: string
}) => {
  // allow passing in the payload instance; otherwise get global
  const _payload = payload || getPayload({} as any)

  const now = new Date().toISOString()

  const result = await _payload.find({
    collection: 'discounts',
    where: {
      and: [
        { startDate: { lte: now } },
        { endDate: { gte: now } },
        { products: { contains: productId } },
        { _status: { equals: 'published' } },
      ],
    },
    limit: 1,
    pagination: false,
  })

  const doc = result?.docs?.[0] || null

  if (!doc) return null

  return {
    id: doc.id,
    title: doc.title,
    percentage: doc.percentage,
  } as ActiveDiscount
}

export default getActiveDiscountForProduct
