// app/api/pesapal/initiate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initiatePesapalPayment } from "@/lib/pesapal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.orderId || !body.amount || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, amount, email" },
        { status: 400 }
      );
    }

    // Ensure amount is a valid number
    const amount = parseFloat(body.amount);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    console.log("Initiating PesaPal payment:", {
      orderId: body.orderId,
      amount,
      email: body.email,
    });

    const paymentResult = await initiatePesapalPayment({
      orderId: body.orderId,
      amount,
      email: body.email,
      firstName: body.firstName || "Customer",
      lastName: body.lastName || "",
      phone: body.phone || "+254700000000",
      description: body.description || `Order ${body.orderId}`,
      callbackUrl: body.callbackUrl,
    });

    return NextResponse.json(
      {
        success: true,
        order_tracking_id: paymentResult.order_tracking_id,
        redirect_url: paymentResult.redirect_url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PesaPal initiation error:", error);
    return NextResponse.json(
      { error: error.message || "Payment initiation failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "PesaPal payment initiation endpoint",
    method: "POST",
  });
}
