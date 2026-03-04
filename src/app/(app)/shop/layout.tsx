import { Search } from '@/components/Search'
import { sorting } from '@/lib/constants'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { use } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getCategories() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
    select: { id: true, title: true },
  })
  return categories.docs
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  // SSR fetch categories
  const categories = use(getCategories())

  return (
    <div className="container flex flex-col gap-8 my-16 pb-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full md:w-1/2 flex-1">
          <Suspense fallback={null}>
            <Search />
          </Suspense>
        </div>
        <div className="flex gap-4 w-full md:w-auto justify-end">
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Kategoriler</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Kategoriler</DropdownMenuLabel>
                <DropdownMenuItem asChild key="all">
                  <Link href="/shop">Tümü</Link>
                </DropdownMenuItem>
                {categories.map((cat: any) => (
                  <DropdownMenuItem asChild key={cat.id}>
                    <Link href={`/shop?category=${cat.id}`}>{cat.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sırala</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Sırala</DropdownMenuLabel>
                {sorting.map((sort) => (
                  <DropdownMenuItem asChild key={sort.slug || 'default'}>
                    <Link href={sort.slug ? `/shop?sort=${sort.slug}` : '/shop'}>{sort.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="min-h-screen w-full">{children}</div>
    </div>
  )
}
