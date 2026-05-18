import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentID, orderId } = body;

    // Mock payment execution
    // In production, verify with payment gateway

    const mockExecuteResponse = {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      paymentID,
      orderId,
      status: "completed",
    };

    // Update order payment status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "PAID",
        paymentTransactionId: mockExecuteResponse.transactionId,
        paidAt: new Date(),
      },
    });

    return NextResponse.json(mockExecuteResponse);
  } catch (error) {
    console.error("Payment execute error:", error);
    return NextResponse.json(
      { error: "Failed to execute payment" },
      { status: 500 }
    );
  }
}
