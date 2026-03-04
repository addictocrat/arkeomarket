'use client'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LogoIcon } from '@/components/icons/logo'
import { useAuth } from '@/providers/Auth'
import { MenuIcon, ShoppingBag, User, LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  menu: Header['navItems']
}

export function MobileMenu({ menu }: Props) {
  const { user } = useAuth()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-foreground transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
        <MenuIcon className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full p-0 flex flex-col border-none bg-white dark:bg-neutral-950"
      >
        {/* Drawer header */}
        <div className="relative flex items-center justify-center px-5 pt-6 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <SheetHeader className="p-0">
            <SheetTitle className="sr-only">Menü</SheetTitle>
            <SheetDescription className="sr-only" />
          </SheetHeader>
          <Link href="/" onClick={closeMobileMenu}>
            <LogoIcon className="w-28 h-auto" />
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {menu?.length ? (
            <>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-3 mb-2 font-medium">
                Keşfet
              </p>
              <ul className="flex w-full flex-col gap-0.5">
                {menu.map((item) => (
                  <li key={item.id}>
                    <CMSLink
                      {...item.link}
                      appearance="link"
                      className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Account section */}
        <div className="px-3 pb-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-3 mb-3 font-medium">
            Hesap
          </p>
          {user ? (
            <ul className="flex flex-col gap-0.5">
              <li>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  <ShoppingBag className="h-4 w-4 opacity-60" />
                  Siparişlerim
                </Link>
              </li>
              <li>
                <Link
                  href="/account/addresses"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  <User className="h-4 w-4 opacity-60" />
                  Adreslerim
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  <User className="h-4 w-4 opacity-60" />
                  Hesabımı yönet
                </Link>
              </li>
              <li className="mt-3 px-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/logout">Çıkış yap</Link>
                </Button>
              </li>
            </ul>
          ) : (
            <div className="flex flex-col gap-2 px-3">
              <Button asChild className="w-full justify-start gap-2" variant="outline">
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  Giriş yap
                </Link>
              </Button>
              <Button asChild className="w-full justify-start gap-2">
                <Link href="/create-account">
                  <UserPlus className="h-4 w-4" />
                  Hesap oluştur
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
