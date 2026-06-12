// lib/pesapal.ts
import axios from 'axios';

const PESAPAL_API_URL = 'https://sandbox.pesapal.com/api/v3'; // Change to https://api.pesapal.com/api/v3 for production

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

interface PaymentStatus {
  order_tracking_id: string;
  merchant_reference: string;
  payment_method: string;
  amount: number;
  currency: string;
  error_message: string;
  pesapal_transaction_tracking_id: string;
  pesapal_merchant_reference: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'INVALID';
}

let tokenCache: { token: string; expiresAt: number } | null = null;

/**
 * Get PesaPal Authorization Token
 */
export async function getPesapalToken(): Promise<string> {
  // Check if token is still valid
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  try {
    const response = await axios.post(`${PESAPAL_API_URL}/auth/token`, {
      consumer_key: process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET,
    });

    const token = response.data.token;
    const expiresAt = Date.now() + (response.data.expiresIn || 3600) * 1000;

    tokenCache = { token, expiresAt };
    return token;
  } catch (error) {
    console.error('Failed to get PesaPal token:', error);
    throw new Error('PesaPal authentication failed');
  }
}

/**
 * Initiate Payment
 */
export async function initiatePesapalPayment(paymentData: PaymentRequest) {
  try {
    const token = await getPesapalToken();

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
          country_code: 'KE', // Change based on your currency
        },
        redirect_mode: 'REDIRECT',
        redirect_url: paymentData.callbackUrl,
        notification_id: '1', // Use for IPN
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log('Payment initiated successfully:', response.data);

    return {
      order_tracking_id: response.data.order_tracking_id,
      redirect_url: response.data.redirect_url,
      merchant_reference: response.data.merchant_reference,
    };
  } catch (error) {
    console.error('PesaPal payment initiation failed:', error);
    throw error;
  }
}

/**
 * Check Payment Status
 */
export async function checkPesapalPaymentStatus(orderTrackingId: string): Promise<PaymentStatus> {
  try {
    const token = await getPesapalToken();

    const response = await axios.get(
      `${PESAPAL_API_URL}/transactions/${orderTrackingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

/**
 * Get Customer Details
 */
export async function getPesapalCustomerDetails(orderTrackingId: string) {
  try {
    const token = await getPesapalToken();

    const response = await axios.get(
      `${PESAPAL_API_URL}/transactions/${orderTrackingId}/customers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to get customer details:', error);
    throw error;
  }
}

/**
 * Verify IPN Signature (for webhook verification)
 */
export function verifyPesapalSignature(
  orderTrackingId: string,
  signature: string,
  salt: string
): boolean {
  try {
    // Implementation depends on PesaPal's signature method
    // This is a placeholder - refer to PesaPal docs for exact implementation
    console.log('Verifying signature for:', orderTrackingId);
    return true;
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

export default {
  initiatePesapalPayment,
  checkPesapalPaymentStatus,
  getPesapalToken,
  getPesapalCustomerDetails,
  verifyPesapalSignature,
};
