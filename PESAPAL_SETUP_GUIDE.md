# 🇰🇪 PesaPal Payment Integration Guide

## What is PesaPal?

PesaPal is a leading African payment solution supporting:
- **Mobile Money**: M-Pesa, MTN, Airtel, etc.
- **Bank Transfers**: Local and international
- **Cards**: Visa, Mastercard
- **E-wallets**: PayPal, Skrill

**Supported Countries**: Kenya, Uganda, Tanzania, Ghana, Zambia, Rwanda, South Africa, and more.

---

## 🚀 Step 1: Create PesaPal Account

1. Go to: **https://www.pesapal.com/**
2. Click **"Sign Up"** or **"Developers"**
3. Create your merchant account
4. Verify your email and phone
5. Complete KYC (Know Your Customer) - takes 24-48 hours
6. Once approved, you'll get API credentials

---

## 🔑 Step 2: Get Your API Credentials

After approval, go to: **https://developers.pesapal.com/dashboard**

You'll find:
- **Consumer Key** → `NEXT_PUBLIC_PESAPAL_CONSUMER_KEY`
- **Consumer Secret** → `NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET`
- **API Key** → `PESAPAL_API_KEY`
- **API Secret** → `PESAPAL_API_SECRET`

Add them to your `.env` file:
```env
NEXT_PUBLIC_PESAPAL_CONSUMER_KEY=your_consumer_key
NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET=your_consumer_secret
PESAPAL_API_KEY=your_api_key
PESAPAL_API_SECRET=your_api_secret
```

---

## 📍 Step 3: Update Your Currency & Callback URL

Choose your currency (KES for Kenya):
```env
NEXT_PUBLIC_PESAPAL_CURRENCY=KES  # or UGX, TZS, GHS, etc.
```

Set your callback URL (where payments are confirmed):
```env
# Development
NEXT_PUBLIC_PESAPAL_CALLBACK_URL=http://localhost:3000/api/pesapal/callback

# Production
NEXT_PUBLIC_PESAPAL_CALLBACK_URL=https://yourdomain.com/api/pesapal/callback
```

---

## 📦 Step 4: Install PesaPal SDK

```bash
pnpm add axios dotenv
```

---

## 💻 Step 5: Create PesaPal Service (Backend)

Create file: `lib/pesapal.ts`

```typescript
// lib/pesapal.ts
import axios from 'axios';

const PESAPAL_API_URL = 'https://api.pesapal.com/api/v3';
const PESAPAL_SANDBOX_URL = 'https://sandbox.pesapal.com/api/v3'; // For testing

interface PaymentRequest {
  orderId: string;
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  description: string;
  callbackUrl: string;
}

export async function initiatePesapalPayment(paymentData: PaymentRequest) {
  try {
    const response = await axios.post(
      `${PESAPAL_API_URL}/transactions/initiate`,
      {
        reference: paymentData.orderId,
        amount: paymentData.amount,
        currency: process.env.NEXT_PUBLIC_PESAPAL_CURRENCY || 'KES',
        description: paymentData.description,
        billing_address: {
          email_address: paymentData.email,
          phone_number: paymentData.phone,
          first_name: paymentData.firstName,
          last_name: paymentData.lastName,
        },
        redirect_mode: 'REDIRECT',
        redirect_url: paymentData.callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${await getPesapalToken()}`,
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('PesaPal payment initiation failed:', error);
    throw error;
  }
}

export async function getPesapalToken() {
  try {
    const response = await axios.post(
      `${PESAPAL_API_URL}/auth/token`,
      {
        consumer_key: process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET,
      }
    );

    return response.data.token;
  } catch (error) {
    console.error('Failed to get PesaPal token:', error);
    throw error;
  }
}

export async function checkPesapalPaymentStatus(orderTrackingId: string) {
  try {
    const response = await axios.get(
      `${PESAPAL_API_URL}/transactions/${orderTrackingId}`,
      {
        headers: {
          Authorization: `Bearer ${await getPesapalToken()}`,
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to check payment status:', error);
    throw error;
  }
}
```

---

## 🛒 Step 6: Payment Initiation (Frontend)

Create component: `components/PesapalCheckout.tsx`

```typescript
// components/PesapalCheckout.tsx
"use client";

import { useState } from "react";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface CheckoutProps {
  orderId: string;
  amount: number;
  description: string;
}

export default function PesapalCheckout({ orderId, amount, description }: CheckoutProps) {
  const { user, userData } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!user || !userData) {
      alert("Please sign in first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call your backend API to initiate payment
      const response = await fetch("/api/pesapal/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount,
          email: user.email,
          firstName: userData.name?.split(" ")[0] || "Customer",
          lastName: userData.name?.split(" ")[1] || "",
          phone: userData.phone || "",
          description,
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pesapal/callback`,
        }),
      });

      if (!response.ok) throw new Error("Payment initiation failed");

      const data = await response.json();

      // Redirect to PesaPal payment page
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Order ID:</span>
          <span className="font-bold">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="text-2xl font-bold text-green-600">
            {process.env.NEXT_PUBLIC_PESAPAL_CURRENCY} {amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Description:</span>
          <span className="font-bold">{description}</span>
        </div>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay with PesaPal"}
      </button>

      <p className="text-sm text-gray-600 mt-4">
        💳 Supports M-Pesa, Bank Transfer, Cards & more
      </p>
    </div>
  );
}
```

---

## 🔗 Step 7: Backend API Routes

Create file: `app/api/pesapal/initiate/route.ts`

```typescript
// app/api/pesapal/initiate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initiatePesapalPayment } from "@/lib/pesapal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const paymentResult = await initiatePesapalPayment({
      orderId: body.orderId,
      amount: body.amount,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      description: body.description,
      callbackUrl: body.callbackUrl,
    });

    return NextResponse.json({
      redirect_url: paymentResult.redirect_url,
      order_tracking_id: paymentResult.order_tracking_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

Create file: `app/api/pesapal/callback/route.ts`

```typescript
// app/api/pesapal/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkPesapalPaymentStatus } from "@/lib/pesapal";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { OrderTrackingId, OrderMerchantReference } = body;

    // Check payment status with PesaPal
    const paymentStatus = await checkPesapalPaymentStatus(OrderTrackingId);

    // Update order status in Firebase
    if (paymentStatus.status === "COMPLETED") {
      await updateDoc(doc(db, "orders", OrderMerchantReference), {
        payment_status: "completed",
        payment_method: "pesapal",
        tracking_id: OrderTrackingId,
        updated_at: new Date(),
      });

      // Send confirmation email
      // await sendOrderConfirmationEmail(order);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Callback error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "PesaPal callback endpoint" });
}
```

---

## 📊 Supported Payment Methods by Country

| Country | Methods |
|---------|---------|
| 🇰🇪 Kenya | M-Pesa, Bank, Card, PayPal |
| 🇺🇬 Uganda | MTN, Airtel, Bank, Card |
| 🇹🇿 Tanzania | Tigo, Vodacom, Bank, Card |
| 🇬🇭 Ghana | MTN, Vodafone, Bank, Card |
| 🇿🇦 South Africa | EFT, Card, PayPal |

---

## 🧪 Testing PesaPal Payments

### Use Sandbox Environment

Update `lib/pesapal.ts` to use sandbox:

```typescript
const PESAPAL_API_URL = 'https://sandbox.pesapal.com/api/v3'; // For testing
```

### Test Credentials

PesaPal provides test mobile numbers and cards:
- **Test M-Pesa**: Use any 10-digit number
- **Test Amount**: Any amount works in sandbox
- **Test PIN**: Use any 4-digit code

---

## ✅ Your Current Setup

```env
✅ NEXT_PUBLIC_PESAPAL_CONSUMER_KEY=← Get from PesaPal
✅ NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET=← Get from PesaPal
✅ PESAPAL_API_KEY=← Get from PesaPal
✅ PESAPAL_API_SECRET=← Get from PesaPal
✅ NEXT_PUBLIC_PESAPAL_CURRENCY=KES
✅ NEXT_PUBLIC_PESAPAL_CALLBACK_URL=http://localhost:3000/api/pesapal/callback
```

---

## 🎯 Next Steps

1. **Create PesaPal account**: https://www.pesapal.com/
2. **Get API credentials** from developer dashboard
3. **Add credentials to `.env`**
4. **Create the files** from Step 5-7 above
5. **Test in sandbox** before going live

---

## 📚 Useful Links

- **PesaPal Main**: https://www.pesapal.com/
- **Developer Docs**: https://developers.pesapal.com/
- **API Documentation**: https://docs.pesapal.com/
- **Support**: support@pesapal.com

---

## 🔒 Security Notes

- ✅ Never commit `.env` with real credentials
- ✅ Use environment variables for all sensitive data
- ✅ Validate payment amounts on backend
- ✅ Verify IPN (Instant Payment Notification) signatures
- ✅ Store transaction IDs in database for reconciliation

---

**Status**: 🚀 Ready to integrate PesaPal!

Once you get your credentials, fill in the `.env` variables and you'll be all set! 💰
