/* eslint-disable */

import { lazy } from 'react';
// import CareTypes from './pages/care-types';

const Dashboard = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/products'));
const DetailRequestTeacher = lazy(() => import('./pages/products/details'));
const blogs = lazy(() => import('./pages/blogs'));
const blogDetail = lazy(() => import('./pages/blogs/details'));
const users = lazy(() => import('./pages/User'));
const userDetail = lazy(() => import('./pages/User/details'));
const sitting = lazy(() => import('./pages/Settings'));
const staticPage = lazy(() => import('./pages/static-page'));
const staticPageDetail = lazy(() => import('./pages/static-page/details'));
const faqs = lazy(() => import('./pages/Faqs'));
const testimonials = lazy(() => import('./pages/Testimonials'));
const testimonialDetail = lazy(() => import('./pages/Testimonials/details'));
const suppliers = lazy(() => import('./pages/suppliers'));

const routes = [
  { path: '/', element: Dashboard },
  { path: '/products', element: Products },
  { path: '/products/details/:id', element: DetailRequestTeacher },
  { path: '/blogs', element: blogs },
  { path: '/blog/details/:id', element: blogDetail },
  { path: '/users', element: users },
  { path: '/user/details/:id', element: userDetail },
  { path: '/sitting', element: sitting },
  { path: '/static-page', element: staticPage },
  { path: '/static-page/details/:id', element: staticPageDetail },
  { path: '/faqs', element: faqs },
  { path: '/testimonials', element: testimonials },
  { path: '/testimonial/details/:id', element: testimonialDetail },
  { path: '/suppliers', element: suppliers },
];

export default routes;
