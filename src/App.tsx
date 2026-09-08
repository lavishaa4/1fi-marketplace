import { Navigate, Route, Routes } from 'react-router-dom';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { ShopPage } from '@/features/shop/ShopPage';
import { PlaceholderTab } from '@/features/shop/PlaceholderTab';
import { ProductDetailPage } from '@/features/marketplace/ProductDetailPage';
import { CheckoutPage } from '@/features/marketplace/CheckoutPage';
import { OrderConfirmationPage } from '@/features/marketplace/OrderConfirmationPage';

export default function App() {
  return (
    <CheckoutProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/shop/marketplace" replace />} />
        <Route path="/shop" element={<Navigate to="/shop/marketplace" replace />} />

        {/* Product flow sits above the tab route so it is matched first */}
        <Route path="/shop/marketplace/orders/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/shop/marketplace/:productId/checkout" element={<CheckoutPage />} />
        <Route path="/shop/marketplace/:productId" element={<ProductDetailPage />} />

        {/* Shop shell: banner + Top Brands / Nearby Stores / 1Fi Marketplace tabs */}
        <Route path="/shop/:tab" element={<ShopPage />} />

        <Route path="/home" element={<PlaceholderTab title="Home" />} />
        <Route path="/emi-dues" element={<PlaceholderTab title="EMI Dues" />} />
        <Route path="/limit" element={<PlaceholderTab title="Limit" />} />
        <Route path="/profile" element={<PlaceholderTab title="Profile" />} />
        <Route path="*" element={<Navigate to="/shop/marketplace" replace />} />
      </Routes>
    </CheckoutProvider>
  );
}
