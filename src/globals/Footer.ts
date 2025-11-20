import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'banks',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'turkeyflag',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'paytr',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
