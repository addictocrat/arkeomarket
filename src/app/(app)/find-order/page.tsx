import type { Metadata } from 'next'

import { FindOrderForm } from '@/components/forms/FindOrderForm'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

export default async function FindOrderPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return (
    <div className="container py-16">
      <FindOrderForm initialEmail={user?.email} />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Eposta adresinizle siparişi bulun.',
  openGraph: mergeOpenGraph({
    title: 'Siparişi Bul',
    url: '/find-order',
  }),
  title: 'Siparişi Bul',
}
