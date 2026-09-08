# 1Fi Marketplace — SDE Intern Assignment

A new **1Fi Marketplace** section built inside the existing Shop experience of the 1Fi app.
The Shop page exposes three entries — Top Brands, Nearby Stores (both intentionally empty, as
specified) and 1Fi Marketplace, which is fully designed and implemented.

**Live demo: [https://1fi-marketplace-zeta.vercel.app/shop/marketplace](url)** 

## What is implemented

| Flow | Screen | Notes |
| --- | --- | --- |
| Shop shell | `/shop` | Hero banner + segmented tabs, exactly as in the live Shop page |
| Top Brands | `/shop/top-brands` | Tab works, panel blank by design |
| Nearby Stores | `/shop/nearby-stores` | Tab works, panel blank by design |
| 1Fi Marketplace | `/shop/marketplace` | Search, category filter, product cards with starting EMI |
| Product details | `/shop/marketplace/:productId` | Images, variants, EMI plans, highlights, specs |
| All EMI plans | bottom sheet | Full tenure ladder (3–60 months) |
| Review plan | `/shop/marketplace/:productId/checkout` | Plan breakdown, repayment schedule note |
| Confirmation | `/shop/marketplace/orders/:orderId` | Order ID, cashback, first EMI date |

Marketplace behaviour worth calling out:

- **Variants are two-axis** (storage × colour). Changing either re-fetches EMI plans for the new
  price, and out-of-stock combinations are disabled rather than hidden.
- **EMI plans come from the API, never from the component.** Tenure ladder, no-cost cap, cashback
  share and rates all live in `src/services/data/emiConfig.ts`; the maths lives in `src/lib/emi.ts`.
- **Affordability** is checked against the user's mutual-fund backed limit; going over it blocks the
  CTA with an explanation instead of failing at confirmation.
- **Every async surface has three states** — skeleton, error with retry, and empty (search with no
  results). Product images have their own loading and fallback states.

## Matching the existing Shop experience

The live Shop page is a hero banner with a segmented control sitting over it, a pill search field,
a section heading and a stacked list of white cards, over a warm off-white background with the
Home / Shop / EMI Dues / Limit / Profile tab bar. 1Fi Marketplace is added as a **third tab in that
same control** rather than a new page, so the section is reachable exactly where a user already
looks. Product screens reuse the app's detail pattern from "Pay using 1Fi": chevron back, bold
title, white cards and a full-width purple pill CTA with a trailing arrow.

## Product understanding

1Fi is a mutual-fund backed, no-cost EMI platform: units are pledged, not sold, and the customer
keeps earning returns while repaying. That framing drives the copy throughout — the purchase limit
sits at the top of Shop, plans lead with "0% interest" and "units stay invested", and the
confirmation screen ends on the pledge step (CAMS / KFin / MFCentral) rather than a generic
"order placed". No processing, foreclosure or penal charges are shown, matching 1Fi's own terms.

## Tech stack

React 18 + TypeScript + Vite, React Router for navigation, Tailwind CSS for the design tokens.
No UI kit — components mirror the app's mobile shell (max-width frame, bottom tab bar, sticky
header, bottom sheets) so the section drops into the existing experience.

## Architecture

```
src/
  components/      layout shell + reusable UI primitives (Button, Sheet, Badge, Skeleton, states)
  features/
    shop/          Shop landing + the two blank sections
    marketplace/   listing, product details, checkout, confirmation + their components
  services/
    http.ts             transport: latency, cancellation, error mapping
    marketplaceApi.ts   getProducts / getProduct / getEmiPlans / createOrder
    mockConfig.ts       runtime switches for latency and forced failures
    data/               catalogue + EMI configuration (the "database")
  hooks/           useApiQuery (loading, error, abort, retry), useDebouncedValue
  context/         CheckoutContext — the plan selected on the PDP, carried into checkout
  lib/             EMI maths and INR formatting, framework-free and unit-testable
  types/           shared domain types
```

Data flow: **screen → hook → API layer → transport → mock data**. Components never import the
catalogue directly, so replacing `marketplaceApi.ts` with real HTTP calls is the only change needed
for a live backend.

## Reviewing loading and error states

The ⚙ icon on the Marketplace header opens a **Simulate network** sheet: set the response delay
(instant / 700 ms / 2500 ms) and force any endpoint to fail. The same can be done from the URL:

```
/shop/marketplace?latency=2500        slow network
/shop/marketplace?fail=products       listing failure + retry
/shop/marketplace?fail=emi            EMI plans failure inside the product page
```

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

Product images are lightweight SVGs generated by `node scripts/generate-product-images.mjs`, so the
repo carries no third-party image assets.

## Notes and assumptions

- Product, pricing and EMI figures are representative mock data modelled on 1Fi's published tenure
  range (3–60 months) and no-cost positioning.
- Top Brands and Nearby Stores are left blank as the assignment specifies; they still navigate and
  keep the tab bar state so the Shop information architecture is complete.
- The other app tabs (Home, My loans, Profile) are stubs — they exist only so the Shop tab sits in a
  realistic shell.
