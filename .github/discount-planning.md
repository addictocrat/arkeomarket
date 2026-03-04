# Discount System Planning for Payload Ecommerce

This document outlines the implementation plan for a discount system in the Payload-based ecommerce project. The system will allow admins to create discounts from the admin panel, apply them to selected products, and display discounted prices throughout the storefront.

## Features

- **Discount Collection**: Admins can create and manage discounts.
- **Discount Options**:
  - Enter discount title
  - Select discount percentage (applies to TRY prices)
  - Select products to apply the discount
  - Select a time range (start and end date)
- **Frontend Display**:
  - In the `HighImpact` hero, a red banner above all content shows the active discount title, clickable to `/shop`.
  - Discounted price is shown on product cards, product grid cards, and product pages:
    - Discounted price is **bold**
    - Original price is **struck through**
    - Both prices are shown side by side

## Implementation Steps

### 1. Create Discount Collection

- File: `src/collections/Discounts.ts`
- Fields:
  - Title (string)
  - Percentage (number, 0-100)
  - Products (relationship to Products collection, multiple)
  - Start Date (datetime)
  - End Date (datetime)

### 2. Admin Panel Integration

- Register the new collection in `src/payload.config.ts`.
- Ensure admin UI allows creating, editing, and deleting discounts.

### 3. Discount Logic Utility

- File: `src/utilities/getActiveDiscountForProduct.ts`
- Function to:
  - Check if a product has an active discount (by date and product relation)
  - Return discount details if active

### 4. Update Product Price Calculation

- Update price calculation in:
  - `src/components/ProductGridItem/index.tsx`
  - `src/components/ProductItem/index.tsx`
  - `src/app/(app)/products/[slug]/page.tsx`
- Show both original and discounted prices as described

### 5. HighImpact Hero Banner

- File: `src/heros/HighImpact/index.tsx`
- Add a red banner at the top if there is an active discount
- Banner displays discount title and links to `/shop`

### 6. API/SSR Integration

- Ensure discount data is available in product queries (modify product fetch logic if needed)
- Optionally, cache or optimize discount lookups for performance

## Files to Create or Modify

- **Create:**
  - `.github/discount-planning.md` (this file)
  - `src/collections/Discounts.ts`
  - `src/utilities/getActiveDiscountForProduct.ts`
- **Modify:**
  - `src/payload.config.ts`
  - `src/components/ProductGridItem/index.tsx`
  - `src/components/ProductItem/index.tsx`
  - `src/app/(app)/products/[slug]/page.tsx`
  - `src/heros/HighImpact/index.tsx`
  - (Any product query logic to include discount info)

## Checklist

- [ ] Create `Discounts` collection with required fields
- [ ] Register collection in Payload config
- [ ] Implement discount lookup utility
- [ ] Update product card and grid components to show discounted prices
- [ ] Update product page to show discounted prices
- [ ] Add red discount banner to HighImpact hero
- [ ] Ensure discount data is available in product queries
- [ ] Test admin panel discount creation and frontend display

---

**Note:** All code and UI should follow existing project conventions and be implemented in English for code, Turkish for UI where possible.
