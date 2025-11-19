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
      name: 'paytrlogo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'turkeylogo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'bankslogo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
