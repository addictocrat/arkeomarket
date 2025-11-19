import type { Metadata } from 'next'

import { ConfirmOrder } from '@/components/checkout/ConfirmOrder'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ConfirmOrderPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams
}) {
  const searchParams = await searchParamsPromise

  const paymentIntent = searchParams.paymentId

  return (
    <div className="container min-h-[90vh] flex py-12">
      <ConfirmOrder />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Siparişi onaylayın.',
  openGraph: mergeOpenGraph({
    title: 'Ödemeyi tamamlayın',
    url: '/checkout/confirm-order',
  }),
  title: 'Ödemeyi tamamlayın',
}
