import { useParams } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { MarketplaceSection } from '@/features/marketplace/MarketplaceSection';
import { NetworkSettings } from '@/features/marketplace/components/NetworkSettings';
import { BlankSection } from './BlankSection';
import { ShopBanner } from './ShopBanner';
import { ShopTabs } from './ShopTabs';

export function ShopPage() {
  const { tab } = useParams<{ tab: string }>();

  return (
    <AppShell>
      <div className="relative">
        <ShopBanner />
        <div className="absolute right-3 top-5">
          <NetworkSettings />
        </div>
      </div>
      <ShopTabs />
      {tab === 'top-brands' && <BlankSection title="Top Brands" />}
      {tab === 'nearby-stores' && <BlankSection title="Nearby Stores" />}
      {tab === 'marketplace' && <MarketplaceSection />}
    </AppShell>
  );
}
