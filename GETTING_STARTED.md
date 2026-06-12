# 🛍️ ShopCart - Your Personal Clothing Store

Transform this codebase into your own custom e-commerce platform for selling clothing. Complete setup guide, API documentation, and schema customization included.

## 📋 Quick Overview

**ShopCart** is a full-stack e-commerce platform built with:
- **Frontend**: Next.js 15 + React + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes + Server Actions
- **Database**: Sanity CMS (headless CMS for content management)
- **Authentication**: Clerk (user auth & management)
- **Payments**: Stripe (payment processing)
- **Storage**: Firebase (notifications & storage)

---

## 🚀 Getting Started (5 Minutes)

### 1. **Quick Setup**
```bash
# Navigate to project
cd /path/to/shopcartpro-yt

# Run quick start script
chmod +x quick-start.sh
./quick-start.sh
```

### 2. **Create Your Accounts** (See SETUP_GUIDE.md)
- ✅ Sanity CMS Account (free)
- ✅ Clerk Account (free)  
- ✅ Stripe Account (free)
- ✅ Firebase Project (free)

### 3. **Update .env File**
Copy credentials from your accounts into `.env` file

### 4. **Start Dev Server**
```bash
pnpm dev
```

Then open:
- 🛍️ Store: http://localhost:3000
- 🏗️ Studio: http://localhost:3000/studio
- 🚀 Admin: http://localhost:3000/admin

---

## 📚 Documentation Files

### For Setup & Configuration
| File | Purpose |
|------|---------|
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Step-by-step account & environment setup |
| **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** | Progress tracking checklist (9 phases) |
| **[.env.example](.env.example)** | Environment variables template |

### For Development
| File | Purpose |
|------|---------|
| **[API_REFERENCE.md](API_REFERENCE.md)** | Complete API endpoints documentation |
| **[CLOTHING_SCHEMA_GUIDE.md](CLOTHING_SCHEMA_GUIDE.md)** | How to customize schema for clothing store |
| **[README.md](README.md)** | Original project documentation |

---

## 🏗️ Project Structure

```
shopcartpro-yt/
├── app/                           # Next.js app directory
│   ├── api/                       # API routes
│   │   ├── admin/                # Admin endpoints
│   │   ├── auth/                 # Authentication
│   │   ├── checkout/             # Payment processing
│   │   ├── contact/              # Contact form
│   │   ├── newsletter/           # Newsletter signup
│   │   ├── orders/               # Order management
│   │   ├── reviews/              # Product reviews
│   │   ├── user/                 # User profile
│   │   └── webhook/              # Stripe webhooks
│   ├── (admin)/                  # Admin dashboard
│   ├── (auth)/                   # Auth pages (sign-in, sign-up)
│   ├── (client)/                 # Client-facing pages
│   ├── (employee)/               # Employee section
│   ├── studio/                   # Sanity CMS interface
│   └── layout.tsx                # Root layout
│
├── components/                    # React components
│   ├── admin/                    # Admin components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── ProductCard.tsx           # Product display
│   ├── ProductsDetails.tsx       # Product details page
│   ├── Cart.tsx                  # Shopping cart
│   ├── OrdersComponent.tsx       # Order management
│   └── ... (50+ more components)
│
├── actions/                       # Server actions
│   ├── orderEmployeeActions.ts
│   ├── orderCancellationActions.ts
│   ├── userActions.ts
│   ├── reviewActions.ts
│   ├── adminWithdrawalActions.ts
│   └── ... (10+ more)
│
├── sanity/                        # Sanity CMS config
│   ├── schemaTypes/              # Data schemas
│   │   ├── productType.ts        # Product schema (CUSTOMIZE THIS)
│   │   ├── categoryType.ts       # Category schema
│   │   ├── userType.ts           # User schema
│   │   ├── orderType.ts          # Order schema
│   │   ├── reviewType.ts         # Review schema
│   │   └── ... (more types)
│   ├── queries/                  # GROQ queries
│   ├── structure.ts              # Studio navigation
│   └── env.ts                    # Sanity config
│
├── lib/                           # Utilities
│   ├── firebase.ts               # Firebase config
│   ├── stripe.ts                 # Stripe utilities
│   ├── emailService.ts           # Email sending
│   ├── utils.ts                  # Helper functions
│   └── ... (more utilities)
│
├── types/                         # TypeScript types
├── hooks/                         # Custom React hooks
├── contexts/                      # React contexts
├── public/                        # Static assets
│
├── package.json                   # Dependencies
├── sanity.config.ts              # Sanity CMS config
├── next.config.js                # Next.js config
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind CSS config
└── .env                          # Environment variables (UPDATE THIS)
```

---

## 🔧 Key Technologies

### Frontend
- **Next.js 15** - React framework with SSR, API routes
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible component library

### Backend & Data
- **Sanity CMS** - Headless content management system
- **Next.js API Routes** - Serverless backend functions
- **Server Actions** - Direct server-side operations
- **Firebase** - Real-time database and notifications

### Authentication & Payment
- **Clerk** - User authentication and management
- **Stripe** - Payment processing
- **JWT** - Session tokens

### Email & Storage
- **Nodemailer** - Email sending
- **Firebase Storage** - File uploads
- **Vercel Deployment** - Hosting

---

## 🎯 Features

### 👥 User Features
- ✅ User registration & login (Clerk)
- ✅ User profile management
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order tracking
- ✅ Product reviews
- ✅ Wishlist
- ✅ Newsletter subscription
- ✅ Address management

### 📦 Product Management
- ✅ Product catalog
- ✅ Category filtering
- ✅ Search functionality
- ✅ Product reviews and ratings
- ✅ Product recommendations
- ✅ Hot deals section
- ✅ Product variants (sizes, colors)
- ✅ Inventory tracking

### 💳 Payment & Orders
- ✅ Stripe payment integration
- ✅ Order creation & processing
- ✅ Order status tracking
- ✅ Invoice generation
- ✅ Refund handling
- ✅ Multiple payment methods

### 🏪 Store Management
- ✅ Admin dashboard
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Customer management
- ✅ Sales analytics
- ✅ Review moderation

### 📊 Additional Features
- ✅ Blog functionality
- ✅ Contact form
- ✅ Email notifications
- ✅ Analytics tracking
- ✅ SEO optimization
- ✅ Mobile responsive design

---

## 💻 Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Generate Sanity types
pnpm run typegen
```

---

## 🔐 Security Features

- ✅ Environment variables for sensitive data
- ✅ Clerk authentication for user management
- ✅ Stripe webhook signature verification
- ✅ CORS configuration
- ✅ Rate limiting on API routes
- ✅ Input validation
- ✅ SQL injection prevention (via ORM)
- ✅ XSS protection

---

## 📱 Responsive Design

The store is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1920px+)

---

## 🚀 Deployment

### Deploy to Vercel (Recommended - Free)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy with one click

See SETUP_GUIDE.md for detailed deployment instructions.

---

## 🛠️ Customization Guide

### 1. **Change Your Branding**
- Update logo in `public/images/`
- Edit colors in `tailwind.config.ts`
- Update company info in `.env`
- Customize header in `components/Header.tsx`
- Customize footer in `components/Footer.tsx`

### 2. **Customize Product Schema**
See [CLOTHING_SCHEMA_GUIDE.md](CLOTHING_SCHEMA_GUIDE.md) for:
- Adding clothing-specific fields
- Creating size systems
- Material/fabric options
- Care instructions
- Fit information

### 3. **Add New Pages**
Create files in `app/(client)/` for new public pages.

### 4. **Add New API Endpoints**
Create files in `app/api/` for new backend endpoints.

### 5. **Modify Database Schema**
Edit files in `sanity/schemaTypes/` and run `pnpm run typegen`.

---

## 🐛 Troubleshooting

### Common Issues

**Q: Products don't load**
- Check Sanity project ID in `.env`
- Verify API tokens are correct
- Check browser console for errors
- Restart dev server

**Q: Clerk login not working**
- Verify publishable key starts with `pk_`
- Check secret key starts with `sk_`
- Ensure sign-in URLs are configured

**Q: Stripe payment fails**
- Make sure using TEST keys (prefix `test_`)
- Use test card: `4242 4242 4242 4242`
- Check webhook is properly configured

**Q: Email not sending**
- Verify email service credentials
- Check SMTP configuration
- Review email service logs

See API_REFERENCE.md for more details.

---

## 📊 Performance

- ⚡ Next.js optimization
- 🎬 Image optimization with next/image
- 🔄 Server-side caching
- 📦 Code splitting
- 🚀 Static generation where possible

---

## 🤝 Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

### Getting Help
1. Check SETUP_GUIDE.md for setup issues
2. Check API_REFERENCE.md for API questions
3. Check CLOTHING_SCHEMA_GUIDE.md for schema customization
4. Search original documentation above

---

## 📝 License

See LICENSE file for details.

---

## 🎉 Next Steps

1. **Week 1**: Follow SETUP_GUIDE.md to set up accounts and environment
2. **Week 2**: Use SETUP_CHECKLIST.md to complete all setup phases
3. **Week 3**: Customize schema using CLOTHING_SCHEMA_GUIDE.md
4. **Week 4**: Add your products and content
5. **Week 5**: Test thoroughly and deploy

---

## 📞 Contact

For questions about this project:
- Check documentation files
- Review code comments
- Search similar projects online
- Ask in GitHub issues (if applicable)

---

**Ready to launch your online store? Start with [SETUP_GUIDE.md](SETUP_GUIDE.md)!** 🚀

---

**Last Updated**: June 2025  
**Status**: Production Ready  
**Version**: 1.0.0
