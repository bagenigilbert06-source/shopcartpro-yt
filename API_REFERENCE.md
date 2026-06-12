# ShopCart API Routes Reference

## Overview
This document lists all available API endpoints and how to use them. These are your custom server-side APIs for handling business logic.

---

## Authentication Routes
**Path:** `/api/auth/*`

### Related Files
- `app/api/auth/`
- Uses: Clerk authentication

---

## User Routes
**Path:** `/api/user/*`

### Available Endpoints

#### Get User Data
```http
GET /api/user/profile
```
**Auth Required:** Yes (Clerk)
**Returns:** Current user's profile data

#### Update User Address
```http
POST /api/user/address
```
**Body:**
```json
{
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "isDefault": true
}
```

### Related Files
- `app/api/user/` - User profile endpoints
- `actions/userActions.ts` - User data operations

---

## Product Routes
**Path:** `/api/products`

### Available Endpoints

#### Get All Products
```http
GET /api/products
```
**Query Parameters:**
- `category` - Filter by category ID
- `brand` - Filter by brand ID
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search term
- `limit` - Results per page (default: 12)
- `page` - Page number (default: 1)

**Example:**
```
GET /api/products?category=clothing&minPrice=10&maxPrice=100&limit=20
```

#### Get Product Details
```http
GET /api/products/:productId
```
**Returns:** Single product with all details

---

## Cart & Order Routes
**Path:** `/api/orders`, `/api/checkout`

### Create Order
```http
POST /api/orders
```
**Auth Required:** Yes
**Body:**
```json
{
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2,
      "size": "M",
      "color": "Blue"
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "billingAddress": "same"
}
```

### Get Order History
```http
GET /api/user/orders
```
**Auth Required:** Yes
**Returns:** Array of user's orders

### Get Order Details
```http
GET /api/orders/:orderId
```
**Auth Required:** Yes
**Returns:** Single order details

---

## Payment Routes
**Path:** `/api/checkout`, `/api/webhook`

### Initiate Payment
```http
POST /api/checkout
```
**Auth Required:** Yes
**Body:**
```json
{
  "orderId": "order_123",
  "amount": 5999,
  "currency": "usd"
}
```
**Returns:** Stripe client secret

### Stripe Webhook
```http
POST /api/webhook/stripe
```
**Stripe Events Handled:**
- `payment_intent.succeeded` - Payment completed
- `payment_intent.payment_failed` - Payment failed
- `charge.refunded` - Refund processed

---

## Review Routes
**Path:** `/api/reviews`

### Add Product Review
```http
POST /api/reviews
```
**Auth Required:** Yes
**Body:**
```json
{
  "productId": "prod_123",
  "rating": 5,
  "title": "Amazing quality!",
  "content": "Great product, highly recommend",
  "verifiedPurchase": true
}
```

### Get Product Reviews
```http
GET /api/reviews/:productId
```
**Query Parameters:**
- `limit` - Number of reviews (default: 10)
- `sort` - Sort by: newest, helpful, rating (default: newest)

### Admin Approve Review
```http
PUT /api/reviews/:reviewId
```
**Auth Required:** Yes (Admin only)
**Body:**
```json
{
  "status": "approved",
  "adminNotes": "Quality review"
}
```

---

## Admin Routes
**Path:** `/api/admin/*`

### Get Sales Analytics
```http
GET /api/admin/analytics
```
**Auth Required:** Yes (Admin only)
**Query Parameters:**
- `period` - day, week, month, year
- `startDate` - Start date (ISO format)
- `endDate` - End date (ISO format)

### Get Pending Orders
```http
GET /api/admin/orders
```
**Query Parameters:**
- `status` - pending, shipped, delivered, cancelled
- `limit` - Results per page

### Update Order Status
```http
PUT /api/admin/orders/:orderId
```
**Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TRACKING123"
}
```

### Manage Products
```http
POST /api/admin/products
PUT /api/admin/products/:productId
DELETE /api/admin/products/:productId
```

---

## Newsletter Routes
**Path:** `/api/newsletter`

### Subscribe to Newsletter
```http
POST /api/newsletter/subscribe
```
**Body:**
```json
{
  "email": "user@example.com",
  "source": "footer"
}
```

### Unsubscribe
```http
POST /api/newsletter/unsubscribe
```
**Body:**
```json
{
  "email": "user@example.com"
}
```

---

## Contact & Support Routes
**Path:** `/api/contact`

### Send Contact Message
```http
POST /api/contact
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Help with order",
  "message": "I need help with...",
  "phone": "+1 (555) 123-4567"
}
```

---

## Analytics Routes
**Path:** `/api/analytics`

### Track Page View
```http
POST /api/analytics/pageview
```
**Body:**
```json
{
  "page": "/products/clothing",
  "referrer": "google.com"
}
```

### Track Product View
```http
POST /api/analytics/product
```
**Body:**
```json
{
  "productId": "prod_123"
}
```

---

## Error Responses

### Success Response
```json
{
  "success": true,
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `UNAUTHORIZED` - User not authenticated
- `FORBIDDEN` - User doesn't have permission
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `PAYMENT_FAILED` - Payment processing failed
- `SERVER_ERROR` - Server error

---

## Rate Limiting

Most endpoints are rate-limited to prevent abuse:
- `10 requests per minute` for anonymous users
- `60 requests per minute` for authenticated users
- `No limit` for admin endpoints (only accessible by admins)

---

## Testing Your APIs

### Using cURL
```bash
# Get products
curl http://localhost:3000/api/products

# Create review (requires auth token)
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId":"prod_123","rating":5}'
```

### Using Postman
1. Import this API collection into Postman
2. Set up environment variables for auth tokens
3. Test each endpoint
4. Document your findings

---

## Adding New API Routes

To create a new API endpoint:

1. **Create route file:**
   ```
   app/api/[feature]/route.ts
   ```

2. **Basic template:**
   ```typescript
   import { NextRequest, NextResponse } from 'next/server';

   export async function GET(request: NextRequest) {
     try {
       // Your logic here
       return NextResponse.json({ success: true, data: {} });
     } catch (error) {
       return NextResponse.json(
         { success: false, error: 'Error message' },
         { status: 500 }
       );
     }
   }
   ```

3. **Add authentication if needed:**
   ```typescript
   import { getAuth } from "@clerk/nextjs/server";

   const { userId } = await getAuth(request);
   if (!userId) {
     return NextResponse.json(
       { success: false, error: 'Unauthorized' },
       { status: 401 }
     );
   }
   ```

---

## Related Documentation

- **Sanity Queries:** See `sanity/queries/` for data fetching examples
- **Server Actions:** See `actions/` for business logic
- **Environment Setup:** See `SETUP_GUIDE.md`

---

**Last Updated:** 2025-06-12
**Version:** 1.0
