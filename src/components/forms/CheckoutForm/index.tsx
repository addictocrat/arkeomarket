'use client'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Address } from '@/payload-types'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback } from 'react'

type Props = {
  customerEmail?: string
  billingAddress?: Partial<Address>
  shippingAddress?: Partial<Address>
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutForm: React.FC<Props> = ({
  customerEmail,
  billingAddress,
  setProcessingPayment,
}) => {
  const [error, setError] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setProcessingPayment(true)

      if (!termsAccepted) {
        setError('Ödeme ve İade Şartlarını kabul etmelisiniz.')
        setIsLoading(false)
        setProcessingPayment(false)
        return
      }
      // TODO: Implement payTR payment logic here
      // For now, we'll just simulate a delay and then stop loading.
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setError('Payment gateway not implemented yet.')
      setIsLoading(false)
      setProcessingPayment(false)
    },
    [setProcessingPayment, termsAccepted],
  )

  return (
    <form onSubmit={handleSubmit}>
      {error && <Message error={error} />}
      <div className="space-y-4 mt-8 ">
        <div>
          <Label htmlFor="cardNumber">Kart Numarası</Label>
          <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <Label htmlFor="expiryDate">Son Kullanım Tarihi</Label>
            <Input id="expiryDate" placeholder="AY/YIL" />
          </div>
          <div className="w-1/2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" />
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <Button disabled={isLoading || !termsAccepted} type="submit" variant="default">
          {isLoading ? 'Yükleniyor...' : 'Ödeme Yap'}
        </Button>
      </div>
      <div className="flex gap-4 items-center mt-8 ">
        <Checkbox
          id="termsAndConditions"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(!!checked)}
        />
        <Label htmlFor="termsAndConditions">
          <a href="/odeme-ve-iade" target="_blank" rel="noopener noreferrer" className="underline">
            Geri Ödeme ve İade Şartını
          </a>{' '}
          Kabul Ediyorum.
        </Label>
      </div>
    </form>
  )
}
