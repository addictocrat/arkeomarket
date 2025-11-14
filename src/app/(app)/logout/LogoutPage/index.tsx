'use client'

import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

export const LogoutPage: React.FC = (props) => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Çıkış yapıldı.')
      } catch (_) {
        setError('You are already logged out.')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div className="prose dark:prose-invert">
          <h1>{error || success}</h1>
          <p>
            Ürünlerimizi keşfetmek için
            <Fragment>
              {' '}
              <Link href="/search">buraya tıklayın.</Link>
            </Fragment>
            {` Tekrar giriş yapmak için, `}
            <Link href="/login">buraya tıklayın.</Link>.
          </p>
        </div>
      )}
    </Fragment>
  )
}
