import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm'

export default async function ForgotPasswordPage() {
  return (
    <div className="container py-16">
      <ForgotPasswordForm />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Enter your Eposta Adresi to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Şifremi unuttum',
    url: '/forgot-password',
  }),
  title: 'Şifremi unuttum',
}
