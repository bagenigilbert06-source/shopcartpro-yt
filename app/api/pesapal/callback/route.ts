// app/api/pesapal/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkPesapalPaymentStatus } from "@/lib/pesapal";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface PesapalCallbackBody {
  OrderTrackingId?: string;
  OrderMerchantReference?: string;
  OrderNotificationId?: string;
}

/**
 * Handle PesaPal IPN (Instant Payment Notification) Callback
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PesapalCallbackBody;

    console.log("PesaPal Callback received:", body);

    const { OrderTrackingId, OrderMerchantReference } = body;

    if (!OrderTrackingId || !OrderMerchantReference) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check payment status with PesaPal
    const paymentStatus = await checkPesapalPaymentStatus(OrderTrackingId);

    console.log("Payment Status:", paymentStatus);

    // Get order from Firebase
    const orderRef = doc(db, "orders", OrderMerchantReference);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      console.warn(`Order not found: ${OrderMerchantReference}`);
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const orderData = orderDoc.data();

    // Update order status based on payment result
    if (paymentStatus.status === "COMPLETED") {
      console.log("Payment completed, updating order...");

      await updateDoc(orderRef, {
        payment_status: "completed",
        payment_method: "pesapal",
        pesapal_tracking_id: OrderTrackingId,
        pesapal_merchant_reference: paymentStatus.pesapal_merchant_reference,
        payment_amount: paymentStatus.amount,
        payment_currency: paymentStatus.currency,
        order_status: "processing",
        updated_at: new Date(),
        paid_at: new Date(),
      });

      console.log(`Order ${OrderMerchantReference} payment confirmed`);

      // TODO: Send order confirmation email
      // await sendOrderConfirmationEmail(orderData);

      // TODO: Trigger order processing webhook
      // await triggerOrderProcessing(OrderMerchantReference);

      return NextResponse.json(
        {
          success: true,
          message: "Payment confirmed",
          order_id: OrderMerchantReference,
        },
        { status: 200 }
      );
    } else if (paymentStatus.status === "FAILED") {
      console.log("Payment failed, updating order...");

      await updateDoc(orderRef, {
        payment_status: "failed",
        payment_method: "pesapal",
        error_message: paymentStatus.error_message,
        order_status: "cancelled",
        updated_at: new Date(),
      });

      return NextResponse.json(
        {
          success: false,
          message: "Payment failed",
          error: paymentStatus.error_message,
        },
        { status: 200 }
      );
    } else if (paymentStatus.status === "PENDING") {
      console.log("Payment still pending...");

      await updateDoc(orderRef, {
        payment_status: "pending",
        order_status: "awaiting_payment",
        updated_at: new Date(),
      });

      return NextResponse.json(
        {
          success: true,
          message: "Payment pending",
        },
        { status: 200 }
      );
    } else {
      // INVALID or unknown status
      console.warn("Unknown payment status:", paymentStatus.status);

      await updateDoc(orderRef, {
        payment_status: "invalid",
        order_status: "error",
        updated_at: new Date(),
      });

      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("PesaPal Callback Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Callback processing failed",
        success: false,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests for testing
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "PesaPal callback endpoint",
    methods: ["POST"],
    description: "Receives payment notifications from PesaPal",
  });
}
