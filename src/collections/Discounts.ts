import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const Discounts: CollectionConfig = {
  slug: 'discounts',
  admin: {
    group: 'Commerce',
    defaultColumns: ['title', 'percentage', 'startDate', 'endDate', '_status'],
    useAsTitle: 'title',
  },
  access: {
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'percentage',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      admin: {
        step: 0.1,
      },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
  ],
}
