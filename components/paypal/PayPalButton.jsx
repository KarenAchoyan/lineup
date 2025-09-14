"use client";
import { useState, useEffect } from "react";
import { getCookie } from "@/utils/utils";

export default function PayPalButton() {
  const [loading, setLoading] = useState(false);
  const authToken = getCookie('authToken');

  const userData = JSON.parse(authToken);
  const userId = userData?.user_id;

 
  async function handlePay() {
    setLoading(true);
    try {
      const uniqueId = `LINEUP-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;

      const res = await fetch("/api/create-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 30, // integer GEL amount
          currency: "GEL",
          order_id: uniqueId,
          order_desc: "Lineup order",
          user_id:userId
        }),
      });

      const { token, checkout_url: checkoutUrl, payment_id: paymentId, error, details } = await res.json();
      if (!res.ok) {
        console.error("Flitt error:", details || error);
        throw new Error(error || "Failed to create token");
      }

      // If checkout URL is provided, redirect to hosted page
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }

      if (!token) {
        throw new Error("No token or checkout URL returned");
      }

      // Use Flitt SDK via widget as fallback
      window.$checkout("Api").scope(function () {
        this.request("api.checkout.form", "request", {
          payment_system: "card",
          token,
        })
          .done((model) => {
            model.sendResponse();
          })
          .fail((model) => {
            console.error("Checkout Error:", model.attr("error"));
          });
      });
    } catch (err) {
      console.error("Error initiating payment:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      {loading ? "Processing…" : "Pay with Flitt"}
    </button>
  );
}
