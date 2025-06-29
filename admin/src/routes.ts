/* eslint-disable */

import { lazy } from 'react';
// import CareTypes from './pages/care-types';

const Dashboard = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/products'));
const ProductDetails = lazy(() => import('./pages/products/details'));
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
const SupplierDetails = lazy(() => import('./pages/supplier/details'));
const InventoryItem = lazy(() => import('./pages/inventory-item'));
const InventoryItemDetails = lazy(() => import('./pages/inventory-item/details'));
const StockLocation = lazy(() => import('./pages/stock-location'));
const StockTakes = lazy(() => import('./pages/stock-takes'));
const InspectionCommitte = lazy(() => import('./pages/inspection-committee'));
const Newsletter = lazy(() => import('./pages/newsletter'));
const Address = lazy(() => import('./pages/address'));
const GoodReceipt = lazy(() => import('./pages/good-receipt'));
const InspectionReport = lazy(() => import('./pages/inspection-report'));
const GoodsReturn = lazy(() => import('./pages/goods-return'));
const InventoryMovement = lazy(() => import('./pages/inventory-movement'));
const InventoryMovementDetails = lazy(() => import('./pages/inventory-movement/details'));
const ApprovedPriceList = lazy(() => import('./pages/approved-price'));
const StockValuation = lazy(() => import('./pages/stock-valuation'));
const StockValuationDetails = lazy(() => import('./pages/stock-valuation/details'));
const Disposal = lazy(() => import('./pages/disposal'));
const StockTakeDetails = lazy(() => import('./pages/stock-takes-details'));
const StockDetails = lazy(() => import('./pages/stock-takes-details/details'));
const StockTakeCommittee = lazy(() => import('./pages/stock-takes-committee'));
const InventoryUpdate = lazy(() => import('./pages/inventory-update'));
const Favorite = lazy(() => import('./pages/favorite'));

const routes = [
  { path: '/', element: Dashboard },
  { path: '/products', element: Products },
  { path: '/products/details/:id', element: ProductDetails },
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
  { path: '/supplier/details/:id', element: SupplierDetails },
  { path: '/inventory-item', element: InventoryItem },
  { path: '/inventory-item/details/:id', element: InventoryItemDetails },
  { path: '/stock-location', element: StockLocation },
  { path: '/stock-takes', element: StockTakes },
  { path: '/committee', element: InspectionCommitte },
  { path: '/newsletter', element: Newsletter },
  { path: '/address', element: Address },
  { path: '/good-receipt', element: GoodReceipt },
  { path: '/goods-return', element: GoodsReturn },
  { path: '/inspection-report', element: InspectionReport },
  { path: '/inventory-movement', element: InventoryMovement },
  { path: '/inventory-movement/details/:id', element: InventoryMovementDetails },
  { path: '/approved-price', element: ApprovedPriceList },
  { path: '/stock-valuation', element: StockValuation },
  { path: '/stock-valuation/details/:id', element: StockValuationDetails },
  { path: '/disposal', element: Disposal },
  { path: '/stock-take-details', element: StockTakeDetails },
  { path: '/stock-take-details/details/:id', element: StockDetails },
  { path: '/stock-committee', element: StockTakeCommittee },
  { path: '/inventory-update', element: InventoryUpdate },
  { path: '/favorite', element: Favorite },

];

export default routes;
