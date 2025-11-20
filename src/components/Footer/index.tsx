import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { LogoIcon } from '@/components/icons/logo'
import { Media } from '@/components/Media' // <-- new
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { Suspense } from 'react'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer(props?: Partial<Footer>) {
  // if parent passed footer fields, use them; otherwise fetch the global
  const footer: Footer =
    props && (props.paytr || props.turkeyflag || props.banks || props.navItems)
      ? (props as Footer)
      : await getCachedGlobal('footer', 2)()

  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '')
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'

  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  // --- safe logo extraction (same pattern as your ProductGridItem)
  const paytrLogo = footer.paytr && typeof footer.paytr !== 'string' ? footer.paytr : undefined
  const turkeyLogo =
    footer.turkeyflag && typeof footer.turkeyflag !== 'string' ? footer.turkeyflag : undefined
  const banks = footer.banks && typeof footer.banks !== 'string' ? footer.banks : undefined

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="container">
        <div className="flex w-full flex-row pb-12 justify-center items-center ">
          {/* {paytrLogo ? (
            <Media
              resource={paytrLogo}
              className="flex justify-center items-center w-full"
              imgClassName="w-[60%] "
            />
          ) : null} */}
          {banks ? (
            <Media
              resource={banks}
              className="flex justify-center items-center w-full"
              imgClassName="w-full"
            />
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-6 border-t border-neutral-200 py-12 text-sm md:flex-row md:gap-12 dark:border-neutral-700">
          <div>
            <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
              <LogoIcon className="w-32" />
              <span className="sr-only">{SITE_NAME}</span>
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="flex h-[188px] w-[200px] flex-col gap-2">
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
              </div>
            }
          >
            <FooterMenu menu={menu} />
          </Suspense>

          {/* logos + theme (placed where ThemeSelector was) */}
          <div className="md:ml-auto flex flex-col gap-4 items-end">
            {/* <ThemeSelector /> */}
            {paytrLogo ? (
              <Media
                resource={paytrLogo}
                className="flex justify-end w-full"
                imgClassName="w-full md:w-[60%] "
              />
            ) : null}
            {/* logos row: only render when we have an object (not a string id) */}
          </div>
        </div>
      </div>

      <div className="container   text-sm dark:border-neutral-700">
        <div className="py-6 border-t border-neutral-200 mx-auto flex w-full flex-col items-center gap-1 md:flex-row md:gap-0 dark:border-neutral-700">
          <p>
            &copy; {copyrightDate} {copyrightName}
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Made in Türkiye</p>
          <p className="md:ml-auto">
            <a className="text-black dark:text-white" href="https://instagram.com/homelabber">
              Created by a homelabber
            </a>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="flex w-full flex-col gap-6 border-t border-neutral-200 py-6 text-sm md:flex-row md:gap-12 dark:border-neutral-700">
          <div className="flex items-center gap-4">
            {turkeyLogo ? <Media resource={turkeyLogo} imgClassName="max-h-16 w-auto" /> : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
