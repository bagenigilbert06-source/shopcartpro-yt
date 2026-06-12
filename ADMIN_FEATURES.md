# 🔐 Admin Panel Features - ShopCart Pro

## Access Information

**Status:** Running on `http://localhost:3000/admin`  
**Auth Required:** Yes (Clerk Authentication)  
**Admin Emails:** `admin@shopcart.com`, `reactjsbd@gmail.com`

---

## 📊 Available Admin Modules

### 1. **Dashboard** (Premium Feature)
- **Location:** `/admin`
- **Status:** 👑 Premium Feature Locked
- **Features:**
  - Real-time analytics overview
  - Key metrics and KPIs
  - Business insights

### 2. **Orders Management**
- **Location:** `/admin/orders`
- **Endpoints:** 
  - `GET /api/admin/orders` - List all orders
  - `GET /api/admin/orders/[id]` - View order details
- **Features:**
  - View all customer orders
  - Order status tracking
  - Payment method filtering
  - Order date analytics

### 3. **Products Management**
- **Location:** `/admin/products`
- **Endpoints:**
  - `GET /api/admin/products` - List products
- **Features:**
  - Product catalog management
  - Inventory tracking
  - Product details editing

### 4. **Users Management**
- **Location:** `/admin/users`
- **Endpoints:**
  - `GET /api/admin/users` - List all users
  - `GET /api/admin/users/combined` - Combined user data
  - `POST /api/admin/users/sync-to-sanity` - Sync to CMS
  - `GET /api/admin/users/[userId]/activate` - Activate user
  - `DELETE /api/admin/users/[userId]/delete-sanity` - Delete user
  - `POST /api/admin/manage-user` - Manage user details
- **Features:**
  - View all registered users
  - User profile management
  - Account activation/deactivation
  - User data synchronization

### 5. **Reviews Management**
- **Location:** `/admin/reviews`
- **Endpoints:**
  - `GET /api/admin/reviews` - List reviews
- **Features:**
  - View customer reviews
  - Review moderation
  - Rating analytics

### 6. **Subscriptions Management**
- **Location:** `/admin/subscriptions`
- **Endpoints:**
  - `GET /api/admin/subscriptions` - List subscriptions
  - `GET /api/admin/subscriptions/[id]` - Subscription details
  - `POST /api/admin/subscriptions/cleanup-duplicates` - Clean duplicates
  - `DELETE /api/admin/subscriptions/[id]` - Delete subscription
- **Features:**
  - Newsletter subscriptions
  - Email campaign management
  - Subscription list management

### 7. **Employees Management**
- **Location:** `/admin/employees`
- **Status:** Premium Feature (likely)
- **Features:**
  - Employee account management
  - Role assignments
  - Access control

### 8. **Business Accounts**
- **Location:** `/admin/account-requests`
- **Endpoints:**
  - `GET /api/admin/account-requests` - View requests
  - `GET /api/admin/account-requests-summary` - Summary
  - `POST /api/admin/approve-account` - Approve request
  - `POST /api/admin/reject-account` - Reject request
  - `POST /api/admin/cancel-account` - Cancel account
  - `GET /api/admin/business-accounts` - Business accounts list
  - `POST /api/admin/business-accounts/approve` - Approve business account
- **Features:**
  - Business account applications
  - Seller verification
  - Account approval workflows

### 9. **Premium Accounts**
- **Location:** `/admin/premium-accounts`
- **Endpoints:**
  - `GET /api/admin/premium-accounts` - List premium accounts
  - `POST /api/admin/premium-accounts/approve` - Approve premium request
- **Features:**
  - Premium membership management
  - Upgrade request handling

### 10. **Notifications**
- **Location:** `/admin/notifications`
- **Endpoints:**
  - `GET /api/admin/notifications` - List notifications
  - `GET /api/admin/notifications/[id]` - Notification details
  - `POST /api/admin/notifications/send` - Send notification
  - `GET /api/admin/notifications/sent` - View sent notifications
- **Features:**
  - Send system notifications
  - Notification history
  - Broadcast messages to users

### 11. **Analytics** (Premium Feature)
- **Location:** `/admin/analytics`
- **Endpoints:**
  - `GET /api/admin/analytics` - Analytics data
  - `GET /api/admin/stats` - Dashboard statistics
- **Features:**
  - Sales trends
  - Revenue analytics
  - Customer behavior analysis

### 12. **Access Denied**
- **Location:** `/admin/access-denied`
- **Status:** Non-admin users redirected here
- **Message:** "You don't have permission to access the admin panel"

---

## 🔌 Core Admin APIs

### Authentication
All admin endpoints require:
1. **Valid Clerk Session** (from authentication)
2. **Admin Email** in `NEXT_PUBLIC_ADMIN_EMAIL`
3. **Authorization Header** with Clerk JWT token

### Admin Stats Endpoint
```
GET /api/admin/stats
```

**Returns:**
- `totalOrders` - Total number of orders
- `totalRevenue` - Total revenue from orders
- `totalProducts` - Product count
- `recentOrders` - Orders in current month
- `recentRevenue` - Revenue this month
- `lastMonthOrders` - Last month's order count
- `lastMonthRevenue` - Last month's revenue
- `cardPayments` - Card payment revenue
- `codPaid` - COD paid orders revenue
- `codPending` - COD pending revenue
- Order method breakdowns

---

## 🔒 Authentication Flow

1. Navigate to `/sign-in`
2. Sign in with admin email (admin@shopcart.com or reactjsbd@gmail.com)
3. Clerk verifies credentials and creates session
4. Redirected to `/admin` with authentication cookie
5. Admin layout checks `useIsAdmin()` hook
6. If admin, shows admin interface
7. If not admin, redirects to `/admin/access-denied`

---

## 📁 Admin Component Structure

```
components/admin/
├── AdminTopNavigation.tsx
├── AdminOrders.tsx
├── AdminProducts.tsx
├── AdminUsers.tsx
├── AdminReviews.tsx
├── AdminNotifications.tsx
├── AdminSubscriptions.tsx
├── AdminEmployees.tsx (Premium)
├── AdminAnalytics.tsx (Premium)
└── AdminPremiumFeature.tsx (Lockscreen)
```

---

## ⚙️ Environment Configuration

```env
# Admin Emails (comma-separated)
NEXT_PUBLIC_ADMIN_EMAIL=admin@shopcart.com,reactjsbd@gmail.com

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

---

## 🚀 Testing the Admin APIs

### Using cURL with Clerk Token

```bash
# First, authenticate and get token
# Then use in requests:

curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  http://localhost:3000/api/admin/stats

curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  http://localhost:3000/api/admin/users

curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  http://localhost:3000/api/admin/orders
```

---

## 💡 Key Features

✅ Role-based access control (Admin checking)  
✅ Real-time data fetching from Sanity CMS  
✅ Comprehensive order tracking  
✅ User management system  
✅ Email notification system  
✅ Business account verification  
✅ Analytics and reporting (Premium)  
✅ Employee management (Premium)  

---

## 🔴 Currently Blocked

- ❌ Dashboard access (Premium feature)
- ❌ Analytics module (Premium feature)
- ❌ Employee management (Premium feature)
- ❌ Advanced reporting (Premium feature)

---

## 📝 Notes

- This is a free version with core features enabled
- Premium features require purchase upgrade
- Database is Sanity CMS
- Authentication via Clerk
- Payments handled by Stripe
