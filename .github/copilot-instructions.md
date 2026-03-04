# Copilot Instructions for Arkeomarket

This document guides AI coding agents to be productive in the Arkeomarket codebase. It summarizes architecture, workflows, conventions, and integration points specific to this project.

## Architecture Overview

- **Monorepo Structure:** All source code is under `src/`, organized by feature (e.g., `blocks/`, `collections/`, `components/`, `access/`).
- **Payload CMS:** The project is a Turkish adaptation of Payload Ecommerce, with customizations for local payment providers and currency.
- **Major Features:** Authentication, access control, layout builder, live/draft preview, SEO, search/filters, scheduled publishing, products/variants, carts, orders, payments, and automated tests.
- **Key Directories:**
  - `src/collections/`: Data models (Products, Users, Pages, Categories, Media)
  - `src/components/`: UI components, organized by domain (e.g., `product/`, `forms/`, `checkout/`)
  - `src/access/`: Access control logic (admin/customer/public)
  - `src/blocks/`: Page builder blocks
  - `src/app/`: Next.js app directory
  - `src/utilities/`: Shared utility functions
  - `src/endpoints/seed/`: Data seeding scripts

## Developer Workflows

- **Install dependencies:** `pnpm install`
- **Run development server:** `pnpm dev` (Next.js)
- **Run tests:**
  - Unit/integration: `pnpm test` (Vitest)
  - E2E: `pnpm playwright test`
- **Linting:** `pnpm lint` (ESLint)
- **Build:** `pnpm build`
- **Seeding data:** Run scripts in `src/endpoints/seed/` as needed.
- **Environment:** Use `.env` and `test.env` for configuration.

## Project-Specific Conventions

- **Access Control:** All access logic is in `src/access/`. Use these utilities for field and collection-level permissions.
- **Component Organization:** UI components are grouped by domain. Prefer creating new components in the relevant subfolder.
- **Blocks:** Page builder blocks live in `src/blocks/` and follow a pattern of a folder per block type.
- **Testing:** E2E tests are in `src/tests/e2e/`, integration tests in `src/tests/int/`. Use Vitest for unit/integration, Playwright for E2E.
- **Currency:** All monetary logic uses TRY. Payment integrations are with PayTR and Iyzico.
- **SEO & Meta:** Use utilities in `src/utilities/generateMeta.ts` and related files for SEO/meta tags.

## Integration Points

- **Payment Providers:** PayTR and Iyzico are integrated for Turkish payments. See relevant logic in `src/collections/Orders/` and payment-related components.
- **Payload CMS:** Custom config in `src/payload.config.ts` and types in `src/payload-types.ts`.
- **Next.js:** App directory structure in `src/app/`.
- **Tailwind CSS:** Configured via `tailwind.config.mjs` and used throughout UI components.

## Patterns & Examples

- **Access Example:** See `src/access/adminOnly.ts` for admin-only logic.
- **Block Example:** See `src/blocks/Banner/` for a typical block implementation.
- **Component Example:** See `src/components/product/ProductGridItem/` for product UI patterns.
- **Test Example:** See `src/tests/e2e/frontend.e2e.spec.ts` for E2E test structure.

## Additional Notes

- All code and comments should be in Turkish where possible.
- Follow existing folder and naming conventions for new features.
- Reference this file and the README for project context.

---

Please review and suggest updates if any section is unclear or missing project-specific details.
