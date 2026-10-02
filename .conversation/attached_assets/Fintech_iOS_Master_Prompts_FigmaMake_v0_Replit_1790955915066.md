# Fintech iOS Mobile App — Master Build Prompts
## Figma Make AI + Vercel v0 + Replit AI

**Purpose:** Build a client-facing, production-quality frontend prototype for an iOS-first fintech/trading marketplace application.

**Primary references:**
- 5paisa — https://www.5paisa.com/
- Groww — https://groww.in/
- Binance India — https://www.binance.com/en-IN
- Zerodha — https://zerodha.com/
- Uploaded color specification — `Citron Light — Fintech Mobile Color System (Light Theme Only)`

**Critical instruction:** The uploaded Citron Light MD file is the source of truth for color. Do not invent another palette. It defines the Citron accent, neutral hierarchy, semantic financial colors, chart colors, accessibility rules, and color-vision-safe mode. In particular, it specifies a white canvas, deep ink text, one scarce Citron accent, and restrained semantic green/red usage. 

---

# PART A — SHARED PRODUCT BRIEF

## 1. Product concept

The client wants an iOS-first fintech mobile application prototype where a user can:

1. Sign up
2. Log in
3. Browse a financial/product marketplace
4. List their own product
5. View their listed products
6. Buy a product
7. Sell a product
8. View portfolio/holdings
9. View stock prices
10. View live/fake market prices
11. Search financial products/stocks
12. Add instruments to a watchlist
13. Open an asset detail page
14. View a price chart
15. Place a simulated Buy order
16. Place a simulated Sell order
17. View orders
18. View transaction history
19. View notifications
20. View profile/settings
21. Switch between Default and Color-Vision-Safe price colors

This is currently a **demo/prototype for client review**, not a production financial trading system.

---

# 2. NON-NEGOTIABLE SCOPE

## Frontend is the priority

Spend the majority of effort on:

- UI quality
- Visual hierarchy
- Information architecture
- Interaction design
- Mobile usability
- Pixel-level spacing
- Typography hierarchy
- Color implementation
- Financial-data readability
- Charts
- Buy/Sell workflows
- Empty/loading/error/success states
- Responsive behavior
- Accessibility
- Realistic demo data

Do NOT spend significant effort on:

- Real brokerage APIs
- Real stock-market APIs
- Real payments
- Real KYC
- Real authentication
- Real order execution
- Real financial transactions
- Real-time WebSockets
- Real banking integrations
- Production compliance infrastructure
- Production database architecture

Everything can be mocked.

---

# 3. BACKEND / API REQUIREMENT

For this prototype:

- Use fake authentication.
- Use fake users.
- Use fake products.
- Use fake financial instruments.
- Use fake market prices.
- Use fake portfolio values.
- Use fake orders.
- Use fake transactions.
- Use fake notifications.
- Use fake chart data.
- Use fake seller/buyer data.
- Use deterministic mock APIs or local mock data.

No real financial API is required.

The application should behave as if it has a backend.

Create a clean mock service layer so real APIs can be connected later without rewriting the UI.

Suggested abstraction:

```text
services/
  authService
  marketService
  productService
  orderService
  portfolioService
  transactionService
  notificationService
```

Each service should return realistic mock data.

---

# 4. VERCEL REQUIREMENT

The eventual backend/API can be deployed on Vercel.

Do not build the prototype around a backend dependency.

For the prototype:

- frontend must work without a backend
- mock service layer must work locally
- API calls should be abstracted
- no secrets
- no real credentials
- no real payment keys
- no real market API keys

If a web-based implementation is used, keep the architecture Vercel-friendly.

If a React Native/Expo implementation is used, remember that Vercel is for web/API deployment; the iOS app itself will ultimately be built/distributed through the Apple ecosystem.

---

# 5. iOS-FIRST DESIGN

Design for a modern iPhone first.

Primary reference viewport:

**393 × 852 px**

Use:

- Safe-area awareness
- iOS-style navigation behavior
- Large touch targets
- Bottom tab navigation
- Native-feeling sheets
- Bottom sheets
- Full-screen modals where appropriate
- Keyboard-safe forms
- Thumb-friendly controls
- Clear tap states
- Haptic-ready interaction points where implementation permits

Do not create a desktop dashboard squeezed into a phone.

The UI must feel designed specifically for iPhone.

---

# 6. VISUAL DIRECTION

The visual direction should combine principles observed across the references without cloning any brand.

### 5paisa inspiration

Use its strength in:

- Dense but structured market information
- Advanced market/trading data
- Order and execution visibility
- Charts
- Market depth concepts
- Strong financial-data hierarchy

5paisa currently presents stocks, F&O, mutual funds, ETFs and other investment/trading capabilities, and its mobile product emphasizes market data, charts, orders and real-time alerts. 

### Groww inspiration

Use its strength in:

- Beginner-friendly discovery
- Clear product hierarchy
- Simple investing flows
- Search/discovery
- Easy-to-understand financial information
- Clean visual presentation

Groww currently emphasizes stocks, ETFs, IPOs, F&O, mutual funds, advanced charts, watchlists/market information and simplified investing experiences. 

### Zerodha inspiration

Use its strength in:

- Clean marketwatch
- Holdings vs positions clarity
- Order visibility
- P&L clarity
- Filtering/grouping
- Efficient information density
- Fast workflows

Zerodha's current Kite experience emphasizes marketwatch, positions, orders, holdings, charts, alerts and real-time P&L; its 2026 mobile Marketwatch update added more organization and grouping capabilities. 

### Binance inspiration

Use its strength in:

- Market overview
- Asset search
- Price movement
- Trading interface hierarchy
- Buy/Sell distinction
- Order book concepts
- Chart-first asset detail
- High information density without making every surface visually loud

Binance's trading interface exposes price, percentage change, high/low/volume, chart, order book, market trades and Buy/Sell order workflows. 

**Do not copy logos, exact screens, proprietary visual assets, or exact brand styling.**

The result must be an original product.

---

# 7. BRAND

Brand accent:

**Citron — #CDE72F**

Use the uploaded Citron Light color system as the authoritative color specification.

Important rules from that system:

- White/light theme only
- Neutral-first hierarchy
- Citron is scarce and primarily owns the primary CTA
- Use `neutral.900` for text on Citron
- Never use white text on Citron
- Semantic green/red are for meaning, not decoration
- Positive/negative direction must never rely on color alone
- Charts have a restrained palette
- Color-vision-safe financial colors are supported

The uploaded specification defines:

- Primitive tokens
- Semantic tokens
- Financial tokens
- Status tokens
- Chart tokens
- State colors
- Surface hierarchy
- Border hierarchy
- WCAG validation
- CVD-safe mode
- Figma variable naming

Treat those definitions as source-of-truth and bind UI colors to them rather than inventing HEX values.

---

# 8. COLOR SYSTEM IMPLEMENTATION

Use semantic tokens.

Examples:

```text
background.primary
background.secondary
background.tertiary
background.input
background.selected
background.disabled

content.primary
content.secondary
content.tertiary
content.placeholder
content.disabled
content.brand
content.on-brand
content.success
content.error
content.warning
content.info

border.subtle
border.default
border.strong
border.input
border.focus
border.selected
border.success
border.error
border.warning
border.info

action.primary.default
action.primary.pressed
action.primary.disabled
action.primary.content
action.secondary.default
action.secondary.pressed
action.ink.default
action.ink.pressed
action.destructive.default
action.destructive.pressed
action.success.default
action.success.pressed

financial.positive
financial.positive.subtle
financial.negative
financial.negative.subtle
financial.neutral
financial.neutral.subtle
financial.warning
financial.warning.subtle
financial.info
financial.info.subtle
```

Do not hard-code random colors in components.

---

# 9. INFORMATION ARCHITECTURE

Use a bottom navigation structure similar in simplicity to major finance apps.

Recommended:

1. Home
2. Markets
3. Portfolio
4. Orders
5. Profile

Use a prominent contextual action inside relevant screens rather than adding unnecessary navigation items.

Possible Home sections:

- Greeting
- Total portfolio value
- Today's P&L
- Quick actions
- Market snapshot
- Watchlist preview
- Popular assets
- User-listed products
- Recent transactions
- News/market insight placeholder

---

# 10. CORE SCREENS

Build at least these screens.

## Authentication

### Splash
- Brand mark
- Minimal loading state

### Welcome
- Product value proposition
- Login
- Create account

### Login
- Mobile/email field
- Password or OTP demo
- Continue
- Biometric placeholder
- Forgot credentials
- Demo-login shortcut if appropriate

### Sign up
- Name
- Mobile/email
- Password
- Terms checkbox
- Create account

### OTP
- Fake OTP
- Resend
- Verification state

Authentication must be fake.

---

# 11. HOME / DASHBOARD

Create a polished fintech dashboard.

Hierarchy:

1. Header
2. Greeting/profile
3. Portfolio value
4. Day P&L
5. Quick actions
6. Market snapshot
7. Watchlist preview
8. User marketplace/product section
9. Recent activity

Example demo values:

```text
Portfolio
₹2,48,650.40

Today's P&L
+₹4,820.20 (+1.98%)

Available balance
₹68,420.00
```

Use realistic but clearly fictional data.

Do not imply that the data is real.

---

# 12. MARKETS

Create a dedicated Markets screen.

Sections:

- Search
- Market categories
- Indices
- Top gainers
- Top losers
- Most active
- Watchlist
- Recently viewed

Each market row should show:

```text
Asset name
Ticker
Last price
Absolute change
Percentage change
Direction indicator
```

Example:

```text
Reliance Industries
RELIANCE
₹1,482.50
+₹18.40
+1.26%
```

Direction should use:

- sign
- arrow
- semantic color

Never color-only.

---

# 13. ASSET DETAIL

When tapping an asset:

Header:

- Asset name
- Ticker
- Current price
- Price change
- Watchlist control

Chart:

- 1D
- 1W
- 1M
- 1Y
- 5Y

Stats:

- Open
- High
- Low
- Previous close
- Volume
- Market cap
- P/E
- 52-week high
- 52-week low

Primary actions:

- Buy
- Sell

Use the Citron system for the primary action and semantic Buy/Sell treatment according to the uploaded color specification.

---

# 14. BUY FLOW

Design a complete simulated Buy workflow.

Flow:

```text
Asset
→ Buy
→ Order sheet
→ Quantity / Amount
→ Estimated total
→ Order type
→ Review
→ Confirm
→ Success
→ Order details
```

Include:

- Market
- Limit
- Quantity
- Price
- Estimated total
- Available balance
- Fees placeholder
- Review state
- Confirmation
- Success state

Do not actually execute anything.

On confirmation:

```text
Order placed successfully
```

Update mock portfolio/order state locally.

---

# 15. SELL FLOW

Same level of quality as Buy.

Flow:

```text
Asset
→ Sell
→ Quantity
→ Price
→ Estimated proceeds
→ Review
→ Confirm
→ Success
```

Make Buy and Sell clearly distinguishable.

Use semantic meaning rather than arbitrary brand color.

---

# 16. ORDER BOOK / MARKET DEPTH

Create a simplified mobile-friendly market-depth component.

Example:

```text
SELL
₹1,486.20     240
₹1,485.90     180
₹1,485.50     320

──────────────
₹1,484.90  Last

BUY
₹1,484.50     410
₹1,484.10     290
₹1,483.80     170
```

Keep it visually restrained.

Do not create a desktop terminal squeezed into mobile.

---

# 17. PORTFOLIO

Include:

- Total value
- Invested amount
- Overall P&L
- Today's P&L
- Holdings
- Positions
- Allocation chart
- Performance chart

Holding row:

```text
RELIANCE
12 shares
₹17,790
+₹620 (+3.61%)
```

Allow:

- Search
- Filter
- Sort
- Group

---

# 18. USER PRODUCT MARKETPLACE

This is a key custom feature.

Users can list their own products.

Create:

### Marketplace
- Search
- Categories
- Featured products
- Trending
- New listings
- Seller cards

### Product detail
- Product image
- Product name
- Seller
- Price
- Available quantity
- Description
- Seller rating
- Buy button

### List product

Fields:

- Product name
- Category
- Description
- Price
- Quantity
- Image upload placeholder
- Condition/status
- Location
- Preview
- Publish listing

Use mock local data.

---

# 19. MY LISTINGS

Create:

- Active
- Sold
- Drafts
- Paused

Each listing:

```text
Product
Price
Available quantity
Views
Orders
Status
```

Actions:

- Edit
- Pause
- Delete
- View

---

# 20. ORDERS

Create tabs:

- Open
- Completed
- Cancelled

Show:

- Order ID
- Asset/product
- Buy/Sell
- Quantity
- Price
- Total
- Status
- Date/time

Use realistic demo data.

---

# 21. TRANSACTIONS

Create transaction history:

- All
- Buy
- Sell
- Deposit
- Withdrawal
- Marketplace

Each transaction should show:

- icon
- title
- timestamp
- amount
- status

---

# 22. PROFILE

Include:

- Profile information
- Account status
- Security
- Notifications
- Appearance
- Price color preference
- Help
- Terms
- Logout

Appearance should include:

```text
Price colors

Default
Green up / Red down

Color-vision safe
Blue up / Vermilion down
```

This follows the uploaded color system.

---

# 23. MOCK DATA BEHAVIOR

Create realistic dynamic-looking demo behavior without a real API.

For example:

- prices can change slightly on an interval
- timestamps can update
- charts use deterministic arrays
- watchlist changes locally
- Buy creates an order
- Sell creates an order
- successful order updates mock portfolio
- listing a product adds it to My Listings
- buying a marketplace product creates a transaction
- filters work
- search works
- tabs work
- navigation works

Do not simulate dangerous/high-frequency trading behavior.

The goal is client demonstration, not financial functionality.

---

# 24. STATES

Every major screen must include:

- Loading
- Empty
- Error
- Success
- Disabled
- Pressed
- Selected
- Focused
- Offline/mock disconnected state where useful

Never leave a screen looking unfinished.

---

# 25. UX WRITING

Copy must feel:

- Clear
- Human
- Concise
- Financially professional
- Indian-market appropriate
- Not crypto-hype language
- Not filled with jargon

Avoid:

“Revolutionary wealth engine”

Prefer:

“Track your money, markets and orders in one place.”

---

# 26. COMPONENT SYSTEM

Create reusable components.

Examples:

```text
AppShell
TopBar
BottomTabBar
Button
IconButton
Input
SearchBar
SegmentedControl
Tabs
AssetRow
MarketRow
PriceChange
MetricCard
PortfolioCard
ChartCard
OrderCard
TransactionRow
StatusChip
FinancialDelta
ProductCard
SellerCard
ListingCard
OrderSheet
ConfirmationSheet
BottomSheet
Toast
EmptyState
ErrorState
LoadingSkeleton
```

Do not duplicate markup unnecessarily.

---

# 27. DESIGN QUALITY

The app must not look AI-generated.

Avoid:

- excessive gradients
- giant cards
- excessive rounded rectangles
- random shadows
- too many colors
- generic dashboard templates
- excessive icons
- oversized headings
- huge empty spaces
- inconsistent corner radii
- inconsistent spacing
- fake glassmorphism
- decorative blobs
- unnecessary illustrations

Target:

**premium fintech + clean iOS product + data-dense trading interface**

---

# 28. RESPONSIVENESS / DEVICE SUPPORT

Primary:

- 393 × 852

Also test conceptually against:

- 375 × 812
- 390 × 844
- 430 × 932

Avoid fixed-width layouts.

---

# 29. PERFORMANCE

Even for a prototype:

- lazy-load heavy chart components
- avoid unnecessary rerenders
- use reusable data structures
- optimize images
- avoid massive dependencies
- keep mock data separated from components
- use stable keys
- avoid expensive animations
- keep scrolling smooth

---

# 30. SECURITY DEMO RULES

Never expose:

- real secrets
- API keys
- payment credentials
- brokerage credentials
- personal data

Clearly label mock/demo data in developer comments.

---

# 31. SHARED DEFINITION OF DONE

The finished prototype must:

- launch successfully
- have working navigation
- have working fake auth
- have working fake data
- have functional Buy flow
- have functional Sell flow
- have functional product listing
- have functional marketplace browsing
- have functional mock purchase
- have functional Markets
- have functional charts
- have functional Watchlist
- have functional Portfolio
- have functional Orders
- have functional Transactions
- have functional Profile
- have polished loading/error/empty/success states
- use the Citron Light color system
- remain white/light only
- feel native to iOS
- look client-demo ready

---

# PART B — PROMPT FOR FIGMA MAKE AI

## Copy everything below into Figma Make AI

You are a senior mobile product designer and frontend prototyping engineer.

Build a complete **iOS-first fintech mobile app prototype** based on the product specification above.

The prototype is for a client demo.

### Highest priority

1. Pixel-perfect visual design
2. White/light theme
3. Citron Light color system
4. iOS mobile usability
5. Financial-data readability
6. Realistic interactions
7. Complete user flows
8. Production-quality visual hierarchy

Do NOT design dark mode.

Do NOT spend time on real backend functionality.

Use mocked data and fake authentication.

### Reference analysis

Study these products for interaction and information-architecture inspiration:

- 5paisa
- Groww
- Binance
- Zerodha

Do not clone them.

Extract interaction principles only.

### Figma-specific requirements

Create a coherent reusable component system.

Use Figma variables for:

- primitive colors
- semantic colors
- financial colors
- status colors
- chart colors
- interaction colors

Follow the uploaded `Citron Light` MD file exactly for the color token architecture.

Create:

- reusable components
- variants
- states
- responsive/mobile layouts
- reusable cards
- reusable rows
- bottom sheets
- dialogs
- chart components
- navigation components

### Prototype requirements

Create clickable flows for:

1. Welcome → Login → Home
2. Sign up → OTP → Home
3. Home → Markets → Asset Detail
4. Asset Detail → Buy → Review → Success
5. Asset Detail → Sell → Review → Success
6. Home → Portfolio → Holding Detail
7. Home → Marketplace → Product Detail → Buy
8. Profile → My Listings → Create Listing → Preview → Publish
9. Orders → Order Detail
10. Profile → Appearance → Color-Vision Safe

Use realistic transitions.

Use bottom sheets where they feel native to iOS.

Use modal confirmation only when necessary.

### Visual rule

The app must look like a real fintech product designed by a professional product team, not an AI-generated template.

Before finishing, inspect every screen for:

- alignment
- spacing
- typography hierarchy
- contrast
- inconsistent colors
- inconsistent radii
- excessive shadows
- excessive cards
- visual noise
- broken hierarchy
- clipping
- overflow

Fix all issues before considering the prototype complete.

### Important

Do not invent a new color palette.

Use the uploaded Citron Light specification as the single source of truth.

Do not introduce dark mode.

Do not introduce another brand color.

---

# PART C — PROMPT FOR VERCEL v0 AI

## Copy everything below into v0

Act as a principal frontend engineer and senior product designer.

Build the frontend for an **iOS-first fintech mobile web/prototype experience** based on the specification above.

The target is a mobile viewport of 393 × 852 and the UI must behave like a high-quality mobile application.

### Technical direction

Prefer:

- React
- TypeScript
- modern component architecture
- Tailwind CSS
- accessible components
- reusable design tokens
- mock service layer
- local state for demo interactions

If the environment is web-first, implement a mobile-first PWA-style interface rather than a desktop dashboard.

The code must be clean enough to later connect to a real Vercel backend.

### Architecture

Use a structure similar to:

```text
src/
  app/
  components/
    ui/
    navigation/
    market/
    portfolio/
    orders/
    marketplace/
    auth/
  pages/
  features/
    auth/
    markets/
    portfolio/
    trading/
    marketplace/
    listings/
    orders/
    transactions/
    profile/
  services/
    mock/
  data/
  types/
  hooks/
  lib/
  styles/
```

Adapt the exact structure to the framework if necessary.

### Mock services

Create typed mock services:

```text
mockAuthService
mockMarketService
mockPortfolioService
mockOrderService
mockProductService
mockListingService
mockTransactionService
mockNotificationService
```

Never call external financial APIs.

### State behavior

The following must work locally:

- login
- signup
- OTP
- logout
- watchlist
- buy
- sell
- create listing
- edit listing
- delete listing
- marketplace purchase
- order creation
- portfolio updates
- transaction creation
- tabs
- search
- filter
- sort
- price updates
- chart timeframe changes

Persist demo state locally where practical.

### UI requirements

Build:

- Splash
- Welcome
- Login
- Signup
- OTP
- Home
- Markets
- Asset detail
- Buy order sheet
- Sell order sheet
- Order review
- Success
- Portfolio
- Holdings
- Positions
- Orders
- Transactions
- Marketplace
- Product detail
- Create listing
- My listings
- Profile
- Settings
- Appearance
- Color-vision mode

### Mobile navigation

Use:

```text
Home
Markets
Portfolio
Orders
Profile
```

Keep the bottom navigation fixed and safe-area aware.

### Charts

Build lightweight mock charts using an appropriate charting approach.

Requirements:

- clean white background
- thin grid
- readable labels
- primary ink line
- restrained secondary series
- financial direction colors
- timeframe selector
- tooltip/selected point
- no unnecessary visual decoration

Follow the uploaded Citron chart tokens.

### Design tokens

Do NOT use arbitrary HEX values.

Create CSS variables based on the Citron Light semantic token system.

Example:

```css
:root {
  --background-primary: #FFFFFF;
  --content-primary: #181C24;
  --action-primary-default: #CDE72F;
  --action-primary-content: #181C24;
  --financial-positive: #0B7A4B;
  --financial-negative: #B4182C;
}
```

Use the complete token specification from the uploaded MD file.

### Accessibility

Implement:

- semantic HTML
- accessible labels
- keyboard support where applicable
- visible focus states
- sufficient contrast
- color + icon + text for financial states
- color-vision-safe mode

### Vercel readiness

The project should build successfully for Vercel.

Do not require backend infrastructure to run the demo.

Keep future API integration isolated behind services.

### Final v0 quality pass

After generating the UI, review every screen as a senior fintech product designer.

Fix:

- spacing
- typography hierarchy
- button hierarchy
- card density
- alignment
- overflow
- mobile scrolling
- sticky navigation
- bottom-sheet behavior
- chart proportions
- accessibility
- visual consistency

Do not stop after generating only a landing page.

Build the actual multi-screen product experience.

---

# PART D — PROMPT FOR REPLIT AI

## Copy everything below into Replit Agent

You are a senior full-stack frontend engineer and mobile application architect.

Build the complete client-demo frontend described in this specification.

The product is an **iOS-first fintech mobile application**.

The current implementation is a prototype and must use fake data.

### Critical priority

Frontend > backend.

The client needs to see and test the product experience.

Do not spend time building real financial infrastructure.

### Recommended technology

For an actual mobile-app prototype, prefer:

- React Native
- Expo
- TypeScript

Use an architecture that can later be connected to real APIs.

If the current Replit environment is better suited to web, create a mobile-first responsive implementation that preserves the same UX and component architecture.

Do not compromise the visual design simply because the implementation is a prototype.

### Core application

Implement:

```text
Authentication
Home
Markets
Asset Details
Buy
Sell
Portfolio
Holdings
Positions
Orders
Transactions
Marketplace
Product Details
Create Listing
My Listings
Profile
Settings
Appearance
```

### Fake authentication

Support:

```text
Demo user:
Email: demo@citron.app
Password: Demo@123
```

Also provide:

- signup
- fake OTP
- logout
- session persistence

Make it obvious in developer code that authentication is mock-only.

### Fake market engine

Create a mock market service.

Example assets:

```text
RELIANCE
TCS
HDFCBANK
INFY
ICICIBANK
SBIN
BHARTIARTL
ITC
NIFTY 50
SENSEX
```

Each should contain:

```ts
{
  symbol,
  name,
  price,
  change,
  changePercent,
  open,
  high,
  low,
  previousClose,
  volume,
  marketCap,
  pe,
  history
}
```

Prices can update periodically by a small deterministic/randomized delta.

Do not claim these are live prices.

Display a subtle:

`Demo market data`

indicator where appropriate.

### Marketplace data

Create fake user products.

Example:

```text
Premium Headphones
₹8,499
Tech
Seller: Arjun
Rating: 4.8

MacBook Air M3
₹84,900
Electronics
Seller: Riya
Rating: 4.9

Professional Camera Kit
₹1,24,000
Photography
Seller: Karan
Rating: 4.7
```

Allow users to create their own listing.

### Buy/Sell engine

When the user confirms a mock Buy:

1. create order
2. create transaction
3. update portfolio
4. update balance
5. show success screen

When the user confirms Sell:

1. create order
2. create transaction
3. update portfolio
4. update balance
5. show success screen

No real money.

No real execution.

### Marketplace purchase

When a user purchases a listed product:

1. create transaction
2. reduce available quantity
3. add order
4. show confirmation
5. update recent activity

### Persistence

Use local storage/AsyncStorage or equivalent.

Persist:

- auth state
- watchlist
- orders
- portfolio
- listings
- transactions
- marketplace state
- appearance setting

### Color system

The uploaded:

`Citron Light — Fintech Mobile Color System (Light Theme Only)`

is the source of truth.

Implement its:

- primitive colors
- semantic colors
- financial colors
- status colors
- chart colors
- state colors
- CVD mode

Do not create a new palette.

### White theme

The entire application must remain light/white.

Do not create:

- dark mode
- black dashboard
- dark trading screen
- dark chart background

The only dark colors should be semantic elements such as ink buttons, tooltips, and scrims defined by the color system.

### iOS visual behavior

Use:

- safe areas
- bottom navigation
- bottom sheets
- native-feeling controls
- large touch targets
- keyboard avoidance
- smooth transitions
- press states
- loading skeletons
- confirmation sheets

### Component architecture

Create reusable components:

```text
Button
Input
SearchBar
TabBar
BottomSheet
AssetRow
MarketRow
FinancialDelta
StatusChip
MetricCard
PortfolioCard
Chart
OrderForm
OrderRow
TransactionRow
ProductCard
ListingCard
EmptyState
ErrorState
SuccessState
LoadingState
```

Avoid duplicated UI code.

### Code quality

Use:

- TypeScript types
- predictable state management
- reusable hooks
- service abstractions
- no hardcoded values scattered across components
- semantic design tokens
- clean naming
- comments only where useful

### No backend dependency

The app must run without:

- database
- authentication provider
- payment provider
- brokerage API
- stock API
- Firebase
- Supabase
- Appwrite

A future Vercel backend can replace the mock services later.

### Vercel

Keep API boundaries compatible with a future Vercel backend.

If you create API routes for demo purposes, they must remain mock-only and contain no secrets.

### Testing

Before finishing, manually test:

#### Auth
- login
- signup
- OTP
- logout

#### Markets
- search
- watchlist
- asset detail
- timeframe

#### Trading
- Buy
- Sell
- review
- confirmation
- success
- order history

#### Portfolio
- holdings
- positions
- P&L
- filters

#### Marketplace
- browse
- search
- product detail
- buy
- create listing
- edit listing
- pause listing
- delete listing

#### UI
- loading
- empty
- error
- disabled
- pressed
- selected
- success

### Final visual audit

Do not declare completion immediately after code generation.

Perform a final product audit:

- Is every screen visually consistent?
- Does the navigation feel like an iOS app?
- Are the financial numbers easy to scan?
- Are Buy and Sell unmistakable?
- Is Citron being overused?
- Are semantic colors being used only for meaning?
- Are charts readable?
- Are cards too large?
- Is there unnecessary whitespace?
- Are any elements clipped?
- Do sheets work correctly?
- Does the app work at 393 × 852?
- Does it remain usable at 375 × 812 and 430 × 932?
- Are loading and empty states polished?
- Are accessibility states implemented?
- Does Color-Vision-Safe mode work?

Fix every issue you find.

The final result must look like a serious fintech product prepared for a client demonstration.

---

# PART E — IMPORTANT IMPLEMENTATION NOTES FOR ALL THREE TOOLS

## Do not interpret "production-ready" as "real financial backend"

For this stage, production-ready means:

- production-quality frontend architecture
- production-quality UI
- reusable components
- clean states
- realistic interactions
- accessible design
- responsive/mobile-safe implementation
- maintainable code

It does NOT mean:

- real financial execution
- real authentication
- real KYC
- real payments
- real brokerage integration
- regulatory compliance

Those belong to a later production phase.

---

# PART F — RECOMMENDED BUILD ORDER

If the AI tool needs to work incrementally, use this sequence.

## Phase 1 — Foundation

1. Design tokens
2. Theme
3. Typography hierarchy
4. spacing
5. component primitives
6. navigation
7. mock data models

## Phase 2 — Authentication

1. Splash
2. Welcome
3. Login
4. Signup
5. OTP
6. Home

## Phase 3 — Markets

1. Markets
2. Search
3. Watchlist
4. Asset detail
5. Chart
6. Market depth

## Phase 4 — Trading

1. Buy
2. Sell
3. Order review
4. Confirmation
5. Success
6. Orders

## Phase 5 — Portfolio

1. Portfolio
2. Holdings
3. Positions
4. P&L
5. Transactions

## Phase 6 — Marketplace

1. Marketplace
2. Product detail
3. Purchase
4. Create listing
5. Preview
6. Publish
7. My listings
8. Edit/pause/delete

## Phase 7 — Account

1. Profile
2. Settings
3. Appearance
4. Price color mode
5. Notifications
6. Help

## Phase 8 — QA

1. Navigation audit
2. Visual audit
3. Accessibility audit
4. Responsive audit
5. Interaction audit
6. Mock-data audit
7. Build/deployment audit

---

# FINAL MASTER INSTRUCTION

Do not produce a generic fintech dashboard.

Build a **mobile-first financial product** that combines:

- the data discipline of 5paisa,
- the simplicity and discoverability of Groww,
- the workflow clarity of Zerodha,
- the market/trading information density of Binance,

while creating a completely original product identity using the uploaded **Citron Light** color system.

The product must be:

**white/light, Citron-accented, iOS-first, data-rich, calm, accessible, polished, responsive, interactive, and client-demo ready.**

Do not build dark mode.

Do not build real backend functionality.

Do not use real financial APIs.

Do not copy any reference brand.

Prioritize frontend quality above everything else.
