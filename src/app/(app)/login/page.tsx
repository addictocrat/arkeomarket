import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import Link from 'next/link'

import { LoginForm } from '@/components/forms/LoginForm'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function Login() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('Zaten giriş yaptınız.')}`)
  }

  return (
    <div className="container py-16">
      <div className="max-w-xl mx-auto my-12">
        <RenderParams />

        <h1 className="mb-4 text-[1.8rem]">Giriş Yap</h1>
        <p className="mb-8">
          <Link href="/admin/collections/users">Hesabınıza giriş yapın veya hesap oluşturun.</Link>.
        </p>
        <LoginForm />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Giriş yapın veya hesap oluşturun.',
  openGraph: {
    title: 'Giriş yap',
    url: '/login',
  },
  title: 'Giriş yap',
}
