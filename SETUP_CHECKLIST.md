# ShopCart Setup Checklist

## Phase 1: Database Setup ⚙️

- [ ] **1.1 Create Sanity Account**
  - [ ] Go to https://www.sanity.io/
  - [ ] Sign up for free
  - [ ] Create a new project
  - [ ] Save your Project ID

- [ ] **1.2 Get Sanity Tokens**
  - [ ] Go to Project Settings → API
  - [ ] Create Editor Token (write access)
  - [ ] Create Viewer Token (read-only)
  - [ ] Save both tokens

- [ ] **1.3 Update .env with Sanity Credentials**
  - [ ] Add `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] Add `SANITY_API_TOKEN`
  - [ ] Add `SANITY_API_READ_TOKEN`
  - [ ] Verify no typos

---

## Phase 2: Authentication Setup 🔐

- [ ] **2.1 Create Clerk Account**
  - [ ] Go to https://clerk.com/
  - [ ] Sign up for free
  - [ ] Create new application
  - [ ] Choose Next.js framework

- [ ] **2.2 Get Clerk Keys**
  - [ ] Copy Publishable Key (starts with `pk_`)
  - [ ] Copy Secret Key (starts with `sk_`)

- [ ] **2.3 Update .env with Clerk Keys**
  - [ ] Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - [ ] Add `CLERK_SECRET_KEY`
  - [ ] Verify URLs are set correctly

---

## Phase 3: Payment Setup 💳

- [ ] **3.1 Create Stripe Account**
  - [ ] Go to https://stripe.com/
  - [ ] Sign up for free
  - [ ] Verify email
  - [ ] Create business account

- [ ] **3.2 Get Stripe Test Keys**
  - [ ] Go to Developers → API Keys
  - [ ] Make sure in Test Mode
  - [ ] Copy Secret Key (`sk_test_...`)
  - [ ] Copy Publishable Key (`pk_test_...`)

- [ ] **3.3 Set Up Stripe Webhook**
  - [ ] Go to Developers → Webhooks
  - [ ] Create endpoint: `YOUR_URL/api/webhook/stripe`
  - [ ] Select these events:
    - [ ] `payment_intent.succeeded`
    - [ ] `payment_intent.payment_failed`
  - [ ] Copy Webhook Secret (`whsec_...`)

- [ ] **3.4 Update .env with Stripe Keys**
  - [ ] Add `STRIPE_SECRET_KEY`
  - [ ] Add `STRIPE_WEBHOOK_SECRET`

---

## Phase 4: Store Information 🏪

- [ ] **4.1 Update Your Store Details**
  - [ ] Edit `.env` file
  - [ ] Update `NEXT_PUBLIC_COMPANY_NAME`
  - [ ] Update `NEXT_PUBLIC_COMPANY_EMAIL`
  - [ ] Update `NEXT_PUBLIC_COMPANY_PHONE`
  - [ ] Update `NEXT_PUBLIC_COMPANY_ADDRESS`
  - [ ] Update `NEXT_PUBLIC_ADMIN_EMAIL`

- [ ] **4.2 Update Social Media Links**
  - [ ] Add Facebook URL (or remove)
  - [ ] Add Twitter/X URL (or remove)
  - [ ] Add Instagram URL (or remove)
  - [ ] Add LinkedIn URL (or remove)

- [ ] **4.3 Configure Business Hours**
  - [ ] Set `NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKDAY`
  - [ ] Set `NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKEND`

---

## Phase 5: Test Your Setup ✅

- [ ] **5.1 Start Development Server**
  - [ ] Run: `pnpm dev`
  - [ ] Visit: http://localhost:3000
  - [ ] Check console for errors

- [ ] **5.2 Test Sanity Connection**
  - [ ] Products page loads (0 products initially)
  - [ ] No Sanity connection errors
  - [ ] Go to http://localhost:3000/studio
  - [ ] Login with Sanity account
  - [ ] Create a test product

- [ ] **5.3 Test Clerk Authentication**
  - [ ] Click Sign Up
  - [ ] Sign up with test email
  - [ ] Verify redirect works
  - [ ] Sign in with same account
  - [ ] Check user profile loads

- [ ] **5.4 Test Store Configuration**
  - [ ] Check footer for company info
  - [ ] Verify company name displays correctly
  - [ ] Check contact info is visible

---

## Phase 6: Add Your Products 📦

- [ ] **6.1 Access Sanity Studio**
  - [ ] Go to http://localhost:3000/studio
  - [ ] Login with your Sanity account

- [ ] **6.2 Create Categories**
  - [ ] Create "T-Shirts" category
  - [ ] Create "Jeans" category
  - [ ] Create "Dresses" category
  - [ ] Create "Jackets" category
  - [ ] Create "Accessories" category

- [ ] **6.3 Create Brands** (optional)
  - [ ] Add your brand name(s)
  - [ ] Add manufacturer names if applicable

- [ ] **6.4 Add First Product**
  - [ ] Click Products → Create
  - [ ] Fill in:
    - [ ] Title (e.g., "Classic Blue T-Shirt")
    - [ ] Description
    - [ ] Price
    - [ ] Category
    - [ ] Upload 3+ images
    - [ ] SKU/Product Code
    - [ ] Stock quantity
    - [ ] Material/Fabric
    - [ ] Available sizes
  - [ ] Publish/Save
  - [ ] Refresh store and verify it appears

- [ ] **6.5 Add More Products**
  - [ ] Add at least 5-10 products
  - [ ] Vary categories
  - [ ] Include product descriptions
  - [ ] Upload quality images

---

## Phase 7: Customize Your Store 🎨

- [ ] **7.1 Update Logo/Branding**
  - [ ] Add your logo to `public/images/`
  - [ ] Update `components/Header.tsx`
  - [ ] Update colors in `components/Footer.tsx`

- [ ] **7.2 Update Email Templates**
  - [ ] Edit `lib/emailService.ts`
  - [ ] Add your company name
  - [ ] Update support email address

- [ ] **7.3 Configure Policies**
  - [ ] Create/update Privacy Policy page
  - [ ] Create/update Terms & Conditions page
  - [ ] Update return policy
  - [ ] Update shipping info

---

## Phase 8: Final Testing 🧪

- [ ] **8.1 Product Browsing**
  - [ ] Browse all categories
  - [ ] Search for products
  - [ ] Filter by price
  - [ ] Check product details

- [ ] **8.2 Shopping Experience**
  - [ ] Add product to cart
  - [ ] Update quantity
  - [ ] Remove from cart
  - [ ] Proceed to checkout

- [ ] **8.3 User Account**
  - [ ] Sign up new account
  - [ ] View profile
  - [ ] View order history
  - [ ] Update account info

- [ ] **8.4 Payment (Test)**
  - [ ] Go to checkout
  - [ ] Use test card: `4242 4242 4242 4242`
  - [ ] Any future date, any CVC
  - [ ] Complete payment
  - [ ] Check order confirmation

---

## Phase 9: Deployment Prep 🚀

- [ ] **9.1 Prepare for Production**
  - [ ] Create `.env.production` file
  - [ ] Update `NEXT_PUBLIC_BASE_URL` to your domain
  - [ ] Get Stripe live keys (when ready)
  - [ ] Test on staging first

- [ ] **9.2 Choose Hosting**
  - [ ] Deploy to Vercel (recommended, free tier)
  - [ ] Or deploy to Netlify
  - [ ] Or deploy to your own server

- [ ] **9.3 Configure Domain**
  - [ ] Point domain to hosting
  - [ ] Update Clerk allowed URLs
  - [ ] Update Stripe redirect URLs

---

## 🎉 Completion

Once all items are checked, your store is ready to go live!

### Post-Launch Tasks
- [ ] Monitor for errors in console
- [ ] Test real payment processing
- [ ] Set up analytics
- [ ] Promote your store
- [ ] Gather customer feedback
