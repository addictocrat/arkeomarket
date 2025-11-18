export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Sırala',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Yeni gelenler' },
  { slug: 'priceInTRY', reverse: false, title: 'Fiyat: Düşükten yükseğe' }, // asc
  { slug: '-priceInTRY', reverse: true, title: 'Fiyat: Yüksekten düşüğe' },
]
