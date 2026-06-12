// components/PesapalCheckout.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutProps {
  orderId: string;
  amount: number;
  description?: string;
  userEmail?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  onSuccess?: (trackingId: string) => void;
  onError?: (error: string) => void;
}

export default function PesapalCheckout({
  orderId,
  amount,
  description = "Order Payment",
  userEmail = "",
  firstName = "Customer",
  lastName = "",
  phone = "",
  onSuccess,
  onError,
}: CheckoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(!userEmail);

  const [formData, setFormData] = useState({
    email: userEmail,
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phone || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form data
      if (!formData.email) {
        throw new Error("Email is required");
      }

      if (!formData.firstName) {
        throw new Error("First name is required");
      }

      if (!formData.phone) {
        throw new Error("Phone number is required");
      }

      console.log("Initiating PesaPal payment...", {
        orderId,
        amount,
        ...formData,
      });

      // Call backend API to initiate payment
      const response = await fetch("/api/pesapal/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          description,
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pesapal/callback`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initiation failed");
      }

      console.log("Payment initiated successfully:", data);

      // Redirect to PesaPal payment page
      if (data.redirect_url) {
        if (onSuccess) {
          onSuccess(data.order_tracking_id);
        }
        window.location.href = data.redirect_url;
      } else {
        throw new Error("No redirect URL received from PesaPal");
      }
    } catch (err: any) {
      const errorMessage = err.message || "Payment initiation failed";
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h2>
        <p className="text-sm text-gray-600">Secure payment powered by PesaPal</p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3 border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Order ID:</span>
          <span className="font-mono font-bold text-gray-900">{orderId}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-300">
          <span className="text-gray-700 font-semibold">Amount to Pay:</span>
          <span className="text-3xl font-bold text-green-600">
            {process.env.NEXT_PUBLIC_PESAPAL_CURRENCY || "KES"} {amount.toFixed(2)}
          </span>
        </div>
        {description && (
          <div className="flex justify-between items-center pt-3 border-t border-gray-300">
            <span className="text-gray-700">Description:</span>
            <span className="text-gray-900">{description}</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Customer Information Form */}
      {showForm ? (
        <form onSubmit={handleCheckout} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (with country code) *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+254712345678"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">E.g., +254712345678 (Kenya)</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Processing...
              </>
            ) : (
              <>
                💳 Pay with PesaPal
              </>
            )}
          </button>
        </form>
      ) : (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mb-6"
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin">⏳</span>
              Processing...
            </>
          ) : (
            <>
              💳 Pay with PesaPal
            </>
          )}
        </button>
      )}

      {/* Payment Methods Info */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">💰 Accepted Payment Methods:</p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Mobile Money (M-Pesa, MTN, Airtel, etc.)</li>
          <li>✓ Bank Transfer</li>
          <li>✓ Debit/Credit Cards (Visa, Mastercard)</li>
          <li>✓ E-wallets (PayPal, Skrill)</li>
        </ul>
      </div>

      {/* Security Info */}
      <div className="mt-4 text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p>Powered by PesaPal - Africa's Leading Payment Platform</p>
      </div>
    </div>
  );
}
