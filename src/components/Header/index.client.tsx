'use client'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { Suspense } from 'react'

import type { Header } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'

import { cn } from '@/utilities/cn'
import { usePathname } from 'next/navigation'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <div className="relative z-20 border-b">
      <nav className="flex items-center md:items-end justify-between container pt-2">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="flex w-full items-end gap-6 md:w-1/3">
            <Link
              className="flex w-full items-center justify-center pt-4 pb-4 md:w-auto font-bold"
              href="/"
            >
              {/* <LogoIcon className="w-6 h-auto" /> */}
              Arkeomarket
            </Link>
            {menu.length ? (
              <ul className="hidden gap-4 text-sm md:flex md:items-center">
                {menu.map((item) => (
                  <li key={item.id}>
                    <CMSLink
                      {...item.link}
                      size={'clear'}
                      className={cn('relative navLink', {
                        active:
                          item.link.url && item.link.url !== '/'
                            ? pathname.includes(item.link.url)
                            : false,
                      })}
                      appearance="nav"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex justify-end md:w-1/3 gap-4">
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
              {user ? (
                <Button
                  asChild
                  variant="nav"
                  size="clear"
                  className="navLink relative items-end hover:cursor-pointer"
                >
                  <Link href="/account">Hesabım</Link>
                </Button>
              ) : (
                // <Button asChild variant="outline">
                //   <Link href="/logout">Çıkış yap</Link>
                // </Button>
                <>
                  <Button
                    asChild
                    variant="nav"
                    size="clear"
                    className="navLink relative items-end hover:cursor-pointer"
                  >
                    <Link href="/login">Giriş yap</Link>
                  </Button>

                  {/* <Button asChild>
                    <Link href="/create-account">Hesap oluştur</Link>
                  </Button> */}
                </>
              )}
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
