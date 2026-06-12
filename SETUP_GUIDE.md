# ShopCart - Project Personalization Guide

## Phase 1: Create Your Own Sanity CMS Account

### Step 1: Sign up for Sanity
1. Go to https://www.sanity.io/
2. Click "Get Started Free"
3. Sign up with email or GitHub
4. Create a new project (name it something like "YourStore-ShopCart")
5. Choose "Production environment"
6. Select your dataset region (closest to you)

### Step 2: Get Your Sanity Credentials
1. In your Sanity Dashboard, go to **Settings** → **Project Settings**
2. Find your **Project ID** (looks like: `abc123def456`)
3. Go to **API** → **Tokens**
4. Create two tokens:
   - **Editor Token** (with write access) - copy this value
   - **Viewer Token** (read-only) - copy this value

### Step 3: Update Your `.env` File
Replace these lines in your `.env` file:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=zvozk79o
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-09
SANITY_API_TOKEN=YOUR_EDITOR_TOKEN_HERE
SANITY_API_READ_TOKEN=YOUR_VIEWER_TOKEN_HERE
```

---

## Phase 2: Set Up Clerk Authentication (Free)

### Step 1: Create Clerk Account
1. Go to https://clerk.com/
2. Sign up with email
3. Create a new application
4. Choose "Next.js" as framework
5. Follow the setup wizard

### Step 2: Get Your Clerk Keys
In your Clerk Dashboard:
1. Go to **API Keys** (usually under Developers section)
2. Copy your **Publishable Key** (starts with `pk_`)
3. Copy your **Secret Key** (starts with `sk_`)

### Step 3: Update `.env` File
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_YOUR_SECRET_HERE
```

---

## Phase 3: Set Up Stripe (for Payments)

### Step 1: Create Stripe Account
1. Go to https://stripe.com/
2. Click "Start now" → Sign up
3. Fill in your business details
4. Verify your email

### Step 2: Get Stripe Keys
1. Go to Dashboard → **Developers** → **API Keys**
2. Make sure you're in "Test Mode" (toggle in top-right)
3. Copy **Secret Key** (starts with `sk_test_`)
4. Copy **Publishable Key** (starts with `pk_test_`)

### Step 3: Get Webhook Secret
1. In Developers → **Webhooks**
2. Create a new endpoint: `YOUR_DOMAIN/api/webhook/stripe`
3. Select event types: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the **Signing secret** (starts with `whsec_`)

### Step 4: Update `.env` File
```
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

---

## Phase 4: Set Up Firebase (for Notifications)

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Create a project"
3. Name it (same as your store)
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Get Firebase Config
1. Go to **Project Settings** (⚙️ icon)
2. Scroll to "Your apps" section
3. Click "Web" icon (</> symbol)
4. Register app with a name
5. Copy the config object

### Step 3: Update Firebase Config
Update `lib/firebase.ts` with your config values

---

## Phase 5: Update Your Store Information

Edit `.env` and update these fields with YOUR information:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Change when deployed
NEXT_PUBLIC_COMPANY_NAME=Your Store Name
NEXT_PUBLIC_COMPANY_EMAIL=your-email@example.com
NEXT_PUBLIC_COMPANY_PHONE=+1 (Your) Phone
NEXT_PUBLIC_COMPANY_ADDRESS=Your Address
NEXT_PUBLIC_COMPANY_CITY=Your City, State ZIP
NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKDAY=Monday - Friday: 9AM - 6PM
NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKEND=Saturday - Sunday: 10AM - 4PM
NEXT_PUBLIC_SUPPORT_EMAIL=support@yourstore.com
NEXT_PUBLIC_SALES_EMAIL=sales@yourstore.com

# Social Media (update with your links)
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourstore
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourstore
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourstore
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yourstore

# Admin Setup
NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com
```

---

## Phase 6: Customize Your Store Schema

### Update Product Types for Clothing

Edit `sanity/schemaTypes/productType.ts` and add clothing-specific fields:
- Size (XS, S, M, L, XL, XXL)
- Color
- Material/Fabric
- Care Instructions
- Available Sizes (with inventory for each)

Example schema addition:
```typescript
{
  name: 'sizes',
  title: 'Available Sizes',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'size', type: 'string', title: 'Size' },
        { name: 'quantity', type: 'number', title: 'Stock Quantity' }
      ]
    }
  ]
},
{
  name: 'material',
  title: 'Material/Fabric',
  type: 'string',
},
{
  name: 'color',
  title: 'Color',
  type: 'string',
}
```

---

## Phase 7: Add Your Products

### After all accounts are set up:

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Access Sanity Studio:**
   - Go to http://localhost:3000/studio
   - Login with your Sanity account

3. **Create your first product:**
   - Click "Products" in left sidebar
   - Click "Create" button
   - Fill in:
     - Title (e.g., "Classic Blue T-Shirt")
     - Description
     - Price
     - Category (create "Clothing" first)
     - Images (upload product photos)
     - Sizes available
     - Material
     - Colors
     - SKU (product code)

4. **Create Categories:**
   - Click "Categories"
   - Create: T-Shirts, Jeans, Dresses, Jackets, Accessories, etc.

5. **Create Brands:**
   - Click "Brands"
   - Add your brand or manufacturer names

---

## Phase 8: Test Your Store

1. Restart your dev server if needed
2. Go to http://localhost:3000
3. Test:
   - Browse products (should show your products now)
   - Add to cart
   - Sign up / Login (using Clerk)
   - Make a test payment (Stripe test mode)

---

## Common Issues & Solutions

### Sanity Content Not Loading
- Check your `.env` has correct Project ID and tokens
- Verify tokens have correct permissions in Sanity dashboard
- Restart dev server: `pnpm dev`

### Clerk Login Not Working
- Verify publishable key starts with `pk_`
- Check secret key starts with `sk_`
- Make sure sign-in/sign-up URLs are correct in `.env`

### Stripe Payment Fails
- Verify you're using TEST keys (prefix `pk_test_` and `sk_test_`)
- Use test card: 4242 4242 4242 4242 (any future date, any CVC)
- Check webhook is properly configured

### Firebase Notifications Not Working
- Verify firebase.ts has correct config
- Check browser console for errors
- Ensure Firebase project has Realtime Database enabled

---

## Next Steps After Setup

1. **Customize UI:**
   - Update `components/Header.tsx` with your logo
   - Update colors in `globals.css`
   - Update footer in `components/Footer.tsx`

2. **Import Products:**
   - Add all your clothing products to Sanity
   - Create product images/photos
   - Organize by categories

3. **Configure Email:**
   - Update email templates in `lib/emailService.ts`
   - Test order notifications

4. **Deploy:**
   - When ready, deploy to Vercel (free)
   - Update `NEXT_PUBLIC_BASE_URL` to your domain
   - Configure production Stripe keys

---

## Support Resources

- **Sanity Docs:** https://www.sanity.io/docs
- **Clerk Docs:** https://clerk.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Firebase Docs:** https://firebase.google.com/docs

---

**Start with Phase 1-3 to get your basic infrastructure running, then add products!**
