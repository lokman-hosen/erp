/* eslint-disable */

import { DashboardOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';

export default [
  {
    label: 'Dashboard',
    key: '/',
  },

  // Management
  {
    label: 'Admin User',
    key: '/admin-user',
  },
  {
    label: 'Users',
    key: '/users',
  },
  {
    label: 'Sitting',
    key: '/sitting',
  },

  // Content
  {
    label: 'Blogs',
    key: '/blogs',
  },
  {
    label: 'Newsletter',
    key: '/newsletter',
  },
  {
    label: 'Page',
    key: '/page',
  },
  {
    label: 'Faqs',
    key: '/faqs',
  },
  {
    label: 'Testimonial',
    key: '/testimonials',
  },
  {
    label: 'Favorite',
    key: '/favorite',
  },

  // Products
  {
    label: 'Products',
    key: '/products',
  },

  {
    label: 'Supplier',
    key: '/supplier',
  },

  // Inventory
  {
    label: 'Inventory',
    children: [
      {
        label: 'Inventory Item',
        key: '/inventory-item',
      },
      {
        label: 'Inventory Update',
        key: '/inventory-update',
      },
      {
        label: 'Inventory Movement',
        key: '/inventory-movement',
      },
      {
        label: 'Approved Price',
        key: '/approved-price',
      },
    ],
  },

  {
    label: 'Stock Valuation',
    children: [
      {
        label: 'Stock Valuation',
        key: '/stock-valuation',
      },
      {
        label: 'Stock Location',
        key: '/stock-location',
      },
      {
        label: 'Stock Takes',
        key: '/stock-takes',
      },
      {
        label: 'Stock Take Details',
        key: '/stock-take-details',
      },
      {
        label: 'Stock Take Committee',
        key: '/stock-committee',
      },
    ],
  },


  // Logistics
  {
    label: 'Goods',
    children: [
      {
        label: 'Good Receipt',
        key: '/good-receipt',
      },
      {
        label: 'Goods Return',
        key: '/goods-return',
      },
    ],
  },

  // Inspection
  {
    label: 'Inspection',
    children: [
      {
        label: 'Inspection Report',
        key: '/inspection-report',
      },
      {
        label: 'Inspection Committee',
        key: '/committee',
      },
    ],
  },

  // Miscellaneous
  {
    label: 'Address',
    key: '/address',
  },
  {
    label: 'Disposal',
    key: '/disposal',
  },
];

