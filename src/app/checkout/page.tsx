"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import {
  ShoppingCart,
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  Check,
  AlertCircle,
  MapPin,
  User,
  Phone,
} from "lucide-react";

type PaymentMethod = "BKASH" | "NAGAD" | "ROCKET" | "COD" | "CARD";

const paymentMethods: {
  id: PaymentMethod;
  name: string;
  icon: string;
  description: string;
  color: string;
}[] = [
  {
    id: "BKASH",
    name: "bKash",
    icon: "💳",
    description: "Pay with bKash Mobile Banking",
    color: "bg-pink-600",
  },
  {
    id: "NAGAD",
    name: "Nagad",
    icon: "💳",
    description: "Pay with Nagad Digital Financial Service",
    color: "bg-orange-600",
  },
  {
    id: "ROCKET",
    name: "Rocket",
    icon: "💳",
    description: "Pay with Rocket (Dutch-Bangla Bank)",
    color: "bg-purple-600",
  },
  {
    id: "COD",
    name: "Cash on Delivery",
    icon: "💵",
    description: "Pay when you receive your order",
    color: "bg-emerald-600",
  },
  {
    id: "CARD",
    name: "Credit/Debit Card",
    icon: "💳",
    description: "Pay with Visa, Mastercard, or other cards",
    color: "bg-blue-600",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    upazila: "",
    postalCode: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-6">
            Add some products to your cart before checking out.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-500 mb-2">
              Thank you for your order. We'll send you a confirmation shortly.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Order #: UB-20240518-{Math.random().toString(36).substr(2, 6).toUpperCase()}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 1999 ? 0 : 120;
  const total = subtotal + shippingCost;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Enter a valid Bangladeshi phone number";
    if (!formData.address.trim()) newErrors.address = "Shipping address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.upazila.trim()) newErrors.upazila = "Upazila is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setOrderPlaced(true);
    setIsProcessing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="House/Building, Road, Area, Thana"
                        rows={3}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                          errors.address
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        }`}
                      />
                    </div>
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="City name"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.city
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:ring-emerald-200"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      District *
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleChange("district", e.target.value)}
                      placeholder="District name"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.district
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:ring-emerald-200"
                      }`}
                    />
                    {errors.district && (
                      <p className="text-xs text-red-500 mt-1">{errors.district}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upazila/Thana *
                    </label>
                    <input
                      type="text"
                      value={formData.upazila}
                      onChange={(e) => handleChange("upazila", e.target.value)}
                      placeholder="Upazila/Thana name"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.upazila
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:ring-emerald-200"
                      }`}
                    />
                    {errors.upazila && (
                      <p className="text-xs text-red-500 mt-1">{errors.upazila}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleChange("postalCode", e.target.value)}
                      placeholder="e.g., 1200"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Note (Optional)
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => handleChange("note", e.target.value)}
                      placeholder="Any special instructions for delivery..."
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        selectedPayment === method.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${method.color}`}
                      >
                        {method.id === "COD" ? (
                          <Banknote className="w-5 h-5" />
                        ) : (
                          <Smartphone className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {method.name}
                          </h3>
                          {selectedPayment === method.id && (
                            <Check className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {method.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment Gateway Info */}
                {selectedPayment !== "COD" && selectedPayment !== "CARD" && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-amber-800">
                        <p className="font-medium mb-1">
                          {selectedPayment} Payment Instructions:
                        </p>
                        <p>
                          You will be redirected to {selectedPayment} payment gateway after placing your order. Please keep your mobile ready for verification.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
                        {item.quantity}x
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.product.title}
                        </p>
                        <PriceDisplay
                          basePrice={item.product.basePrice}
                          salePrice={item.product.salePrice}
                          size="sm"
                          showDiscount={false}
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ৳{(
                          (item.product.salePrice || item.product.basePrice) *
                          item.quantity
                        ).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-emerald-600 font-medium">FREE</span>
                      ) : (
                        `৳${shippingCost}`
                      )}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-gray-500">
                      Free shipping on orders over ৳1,999
                    </p>
                  )}
                  <div className="border-t border-gray-100 pt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Including VAT where applicable
                    </p>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure checkout with SSL encryption</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="mt-6 w-full py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order - ৳{total.toLocaleString()}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <Link
                  href="/cart"
                  className="mt-3 flex items-center justify-center w-full py-2.5 text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
