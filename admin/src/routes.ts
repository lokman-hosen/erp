/* eslint-disable */

import { lazy } from 'react';
// import CareTypes from './pages/care-types';

const Dashboard = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/products'));
const AdminUser = lazy(() => import('./pages/admin-user'));
const DetailRequestTeacher = lazy(() => import('./pages/products/details'));
const blogs = lazy(() => import('./pages/blogs'));
const blogDetail = lazy(() => import('./pages/blogs/details'));
const users = lazy(() => import('./pages/user'));
const userDetail = lazy(() => import('./pages/user/details'));
const sitting = lazy(() => import('./pages/Settings'));
const staticPage = lazy(() => import('./pages/static-page'));
const staticPageDetail = lazy(() => import('./pages/static-page/details'));
const faqs = lazy(() => import('./pages/Faqs'));
const testimonials = lazy(() => import('./pages/Testimonials'));
const testimonialDetail = lazy(() => import('./pages/Testimonials/details'));
const page = lazy(() => import('./pages/page'));
const Supplier = lazy(() => import('./pages/supplier'));
const InventoryItem = lazy(() => import('./pages/inventory-item'));
const StockLocation = lazy(() => import('./pages/stock-location'));
const StockTakes = lazy(() => import('./pages/stock-takes'));
const InspectionCommitte = lazy(() => import('./pages/inspection-committee'));
const Newsletter = lazy(() => import('./pages/newsletter'));
const Address = lazy(() => import('./pages/address'));
const GoodReceipt = lazy(() => import('./pages/good-receipt'));
const InspectionReport = lazy(() => import('./pages/inspection-report'));
const GoodsReturn = lazy(() => import('./pages/goods-return'));
const InventoryMovement = lazy(() => import('./pages/inventory-movement'));
const ApprovedPriceList = lazy(() => import('./pages/approved-price'));
const StockValuation = lazy(() => import('./pages/stock-valuation'));

const routes = [
  { path: '/', element: Dashboard },
  { path: '/products', element: Products },
  { path: '/admin-user', element: AdminUser },
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
  { path: '/page', element: page },
  { path: '/supplier', element: Supplier },
  { path: '/inventory-item', element: InventoryItem },
  { path: '/stock-location', element: StockLocation },
  { path: '/stock-takes', element: StockTakes },
  { path: '/committee', element: InspectionCommitte },
  { path: '/newsletter', element: Newsletter },
  { path: '/address', element: Address },
  { path: '/good-receipt', element: GoodReceipt },
  { path: '/goods-return', element: GoodsReturn },
  { path: '/inspection-report', element: InspectionReport },
  { path: '/inventory-movement', element: InventoryMovement },
  { path: '/approved-price', element: ApprovedPriceList },
  { path: '/stock-valuation', element: StockValuation },
];

export default routes;
