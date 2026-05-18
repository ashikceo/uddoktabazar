import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, amount, orderId } = body;

    // Mock payment gateway initialization
    // In production, integrate with bKash, Nagad, or Rocket APIs

    const mockPaymentResponse = {
      success: true,
      paymentID: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      gatewayURL:
        method === "BKASH"
          ? "https://sandbox.bka.sh/checkout"
          : method === "NAGAD"
          ? "https://sandbox.nagad.com/checkout"
          : "https://sandbox.rocket.com/checkout",
      amount,
      currency: "BDT",
      orderId,
      method,
    };

    return NextResponse.json(mockPaymentResponse);
  } catch (error) {
    console.error("Payment init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
