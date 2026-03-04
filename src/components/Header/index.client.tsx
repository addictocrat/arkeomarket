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
import { LogoIcon } from '../icons/logo'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <div className="relative z-20 border-b">
      <nav className="flex items-center justify-between py-2 px-4 md:pt-4 md:pb-0 md:px-16">
        {/* Logo — always on the left */}
        <Link className="flex items-center py-1 md:py-4 font-bold" href="/">
          <LogoIcon className="w-28 md:w-32 h-auto" />
        </Link>

        {/* Desktop centre nav */}
        {menu.length ? (
          <ul className="hidden gap-4 text-md md:flex md:items-center">
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Suspense fallback={<OpenCartButton />}>
            <Cart />
            {/* Auth — desktop only */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <Button
                  asChild
                  variant="nav"
                  size="clear"
                  className="navLink relative items-end hover:cursor-pointer font-anek-bangla"
                >
                  <Link href="/account">Hesabım</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="nav"
                  size="clear"
                  className="navLink relative items-end hover:cursor-pointer font-anek-bangla"
                >
                  <Link href="/login">GİRİŞ YAP</Link>
                </Button>
              )}
            </div>
          </Suspense>

          {/* Hamburger — mobile only, always on the right */}
          <div className="md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
